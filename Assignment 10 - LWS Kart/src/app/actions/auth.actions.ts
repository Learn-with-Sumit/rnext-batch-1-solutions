'use server'
import { UserModel } from '@/app/models/userModel'
import { signIn, signOut } from '@/auth'
import connectMongo from '@/db/connectMongo'
import { getPasswordResetTokenByToken } from '@/db/queries/token.queries'
import generatePasswordResetToken from '@/utils/generatePasswordResetToken'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { PasswordResetTokenModel } from '../models/passwordResetTokenModel'
import {
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} from './email.actions'
import {
  loginFormSchema,
  NewPasswordFormSchema,
  ResetFormSchema,
} from './zodSchema.index'

export async function doSignOut() {
  await signOut()
}

export async function doSignInWithGoogle() {
  await signIn('google', { callbackUrl: process.env.BASE_URL })
}

export async function doSignInWithFB() {
  await signIn('facebook', { callbackUrl: process.env.BASE_URL })
}

export async function doSignInWithGit() {
  await signIn('github', { callbackUrl: process.env.BASE_URL })
}

export async function login(values: z.infer<typeof loginFormSchema>) {
  const validatedFields = loginFormSchema.safeParse(values)

  // server side validation in case user bypasses the frontend side
  if (!validatedFields.success) {
    return { error: 'Wrong Inputs!' }
  }

  const { email, password, remember } = validatedFields.data

  try {
    const res = await signIn('credentials', {
      email,
      password,
      remember,
      redirect: false,
    })

    const user = (await UserModel.findOne({ email: values.email })
      .select('-password')
      .lean()) as any
    return user
  } catch (err) {
    return null
  }
}
const ONE_HOUR = new Date(new Date().getTime() + 1 * 60 * 60 * 1000)

export const increaseLoginAttemptIfPasswordIsWrong = async (email: string) => {
  try {
    await connectMongo()
    // if user tries to log in with wrong password, increase the login attempt
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        $inc: { 'jail.loginAttempt': 1 },
      },
      { new: true }
    )

    if (!user) {
      return {
        msg: 'No user found',
      }
    }

    // if failed login attempt reaches 3, 🛑 JAIL the user for 1 hour
    if (user.jail.loginAttempt >= 3) {
      await UserModel.findOneAndUpdate(
        { email },
        {
          $set: {
            'jail.loginAttempt': 0,
            'jail.expires': ONE_HOUR,
          },
        },
        { new: true }
      )
    }

    return { msg: 'Login attempt increased' }
  } catch (error) {
    throw error
  }
}

export const resetLoginAttempt = async (email: string) => {
  try {
    await connectMongo()
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        $set: { 'jail.loginAttempt': 0 },
      },
      { new: true }
    )

    if (!user) {
      return {
        msg: 'No user found',
      }
    }
    return { msg: 'Login attempt reset' }
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (value: z.infer<typeof ResetFormSchema>) => {
  const validatedFields = ResetFormSchema.safeParse(value)

  if (!validatedFields.success) {
    return { error: 'Invalid Email!' }
  }

  const { email, recoveryEmail } = validatedFields.data
  try {
    await connectMongo()
    const existingUser = await UserModel.findOne({ email }).select('-password')
    if (!existingUser) {
      return { error: 'No user found by that email' }
    } else {
      // generate password reset token and send the email
      const passwordResetToken = await generatePasswordResetToken(email)
      // so, the idea here is -> send the email to the resend id as I dont have a domain set up, so, only my resend accounts password could be reset in lws kart, so to, reset password of any user, this step is taken
      await sendPasswordResetEmail(recoveryEmail, passwordResetToken.token)
      return existingUser.toObject()
    }
  } catch (error) {
    throw error
  }
}

export const newPassword = async (
  value: z.infer<typeof NewPasswordFormSchema>,
  token?: string | null
) => {
  const validatedFields = NewPasswordFormSchema.safeParse(value)

  // check fields are validated
  if (!validatedFields.success) {
    return { error: 'Invalid password' }
  }

  if (!token) {
    return { error: 'Missing token!' }
  }

  const { password } = validatedFields.data

  // get existing token from db
  const existingToken = await getPasswordResetTokenByToken(token)

  // if there is no token
  if (!existingToken) {
    return { error: 'Invalid token' }
  }

  // check if token has expired
  const hasExpired = new Date(existingToken.expires) < new Date()

  // if expired
  if (hasExpired) {
    return { error: 'Token expired' }
  }

  await connectMongo()

  // get the user with the email from token
  const existingUser = await UserModel.findOne({ email: existingToken.email })

  // if no user
  if (!existingUser) {
    return { error: 'Email does not exist' }
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 5)

  existingUser.password = hashedPassword

  // update and save the password
  await existingUser.save()

  // delete the token after password update
  await PasswordResetTokenModel.deleteOne({ _id: existingToken._id })

  // send a email of password reset successful
  await sendPasswordResetSuccessEmail(existingToken.email)
  return { success: 'Password updated' }
}
