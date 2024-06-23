import { MongoDBAdapter } from '@auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { redirect } from 'next/navigation'
import {
  increaseLoginAttemptIfPasswordIsWrong,
  resetLoginAttempt,
} from './app/actions/auth.actions'
import { AuthTokenModel } from './app/models/TokenModel'
import { UserModel } from './app/models/userModel'
import connectMongo from './db/connectMongo'
import { getAuthTokenByEmail } from './db/queries/token.queries'
import generateAuthToken from './utils/generateAuthToken'
import mongoClientPromise from './utils/mongoClientPromise'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
        remember: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null

        await connectMongo()

        try {
          const user = await UserModel.findOne({ email: credentials.email })
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password as string,
              user.password
            )
            if (isMatch) {
              // create a access token and refresh token with the users email on first log in
              await generateAuthToken(
                credentials.email as string,
                credentials.remember as string
              )
              // reset the login attempt if user successfully logs in
              await resetLoginAttempt(credentials.email as string)
              return user
            } else {
              // implemented a max retry and jail feature
              await increaseLoginAttemptIfPasswordIsWrong(
                credentials.email as string
              )
              throw new Error('Wrong Credentials')
            }
          } else {
            throw new Error('No user found')
          }
        } catch (error) {
          throw new Error(error as any)
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider,
    GithubProvider,
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // save the access token and refresh token in the JWT on the initial login, as well as the user details
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user: token,
        }
      } else if (Date.now() < (token.expires_at as any) * 1000) {
        // if the access token has not expired yet, return it
        return token
      } else {
        try {
          const response = (await fetch('https://oauth2.googleapis.com/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: token.refresh_token,
            } as any),
            method: 'POST',
          })) as any

          const tokens = await response.json()

          if (!response.ok) throw tokens

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          // console.error('Error refreshing access token', error)
          return token
        }
      }
    },

    async session({ session, token }: any) {
      if (!token?.access_token && token?.user?.sub) {
        try {
          await connectMongo()
          // get the user from db excluding the password
          const dbUser = await UserModel.findOne({
            _id: token.user.sub,
          }).select('-password')

          session.user = dbUser
          delete session.expires

          // refresh and access token logic

          // get the accessToken from db
          const existingToken = await getAuthTokenByEmail(dbUser.email)

          if (!existingToken) {
            return { error: 'No token available' }
          }

          // check if tokens are expired
          const accessTokenExpired = new Date(existingToken?.aTExp) < new Date()
          const refreshTokenExpired =
            new Date(existingToken?.rTExp) < new Date()

          // if access token expired
          if (accessTokenExpired) {
            // if refresh token not expired, create new accessToken
            if (!refreshTokenExpired) {
              await AuthTokenModel.deleteOne({ email: dbUser.email })
              // make the new session
              const newToken = await generateAuthToken(dbUser.email, 'false')
              session.accessToken = newToken.accessToken
            } else {
              // delete the token
              await AuthTokenModel.deleteOne({ email: dbUser.email })
              // nullify the users and access token
              session.user = null
              session.token.user = null
              session.accessToken = null
              // inject error in session object
              session.error = 'Refresh Token Expired'
              redirect('/login')
            }
          } else {
            // if accessToken not expired, just use that token
            session.accessToken = existingToken.accessToken
          }

          return session
        } catch (error) {
          console.log(error)
        }
      } else {
        await connectMongo()
        // get the user from db excluding the password
        const dbUser = await UserModel.findOne({
          _id: token.user.sub,
        }).select('-password')

        // populate the user with db data
        session.user = { ...dbUser._doc, id: token.user.sub }
        session.accessToken = token.access_token
        session.error = token.error

        return session
      }
    },
  },
})
