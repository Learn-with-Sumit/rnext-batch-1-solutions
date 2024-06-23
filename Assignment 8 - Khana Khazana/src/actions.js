'use server'

import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers.js'
import { redirect } from 'next/navigation'
import connectMongo from './db/conectMongo.js'
import {
  createUser,
  findUser,
  getRecipe,
  getUserFavorites,
} from './db/queries.js'
import { UserModel } from './models/User.js'
import { validateInput } from './util/validateInput.js'

const FIVE_HOURS = 5 * 60 * 60 * 1000

const registerUser = async (_, formData) => {
  await connectMongo()

  const user = Object.fromEntries(formData)

  const errorObj = validateInput(user)

  delete errorObj.errors.$ACTION_REF_1

  // return the errors
  if (Object.keys(errorObj.errors).length > 0) {
    return errorObj.errors
  } else {
    const data = await createUser(user)
    if (data.msg) {
      return {
        errorFromServer: data.msg,
      }
    } else {
      redirect('/login')
    }
  }
}

const loginUser = async (_, formData) => {
  await connectMongo()

  const user = Object.fromEntries(formData)
  const errorObj = validateInput(user)

  // delete the unnecessary key
  delete errorObj.errors.$ACTION_REF_1

  // check if there are errors
  if (Object.keys(errorObj.errors).length > 0) {
    return errorObj.errors
  } else {
    const found = await findUser(user)
    if (!found?.email) {
      return {
        errorFromServer: 'No user by that email',
      }
    } else {
      if (bcrypt.compareSync(user.password, found.password)) {
        delete found.password
        // set the cookie
        cookies().set(
          'user',
          JSON.stringify(found),
          { secure: true },
          { maxAge: FIVE_HOURS }
        )
        redirect('/')
      } else {
        return {
          errorFromServer: 'Wrong password',
        }
      }
    }
  }
}

const logOut = async () => {
  cookies().delete('user')
  return {
    msg: 'User logged out',
  }
}

const favoriteRecipe = async (recipeId, userId) => {
  await connectMongo()

  const user = await UserModel.findOne({ _id: userId })
  if (!user) {
    return { msg: 'no user found' }
  }

  const isFavorite = user.favorites.includes(recipeId)
  let updatedUser

  // if is favorite, pull the id or else push it
  if (isFavorite) {
    updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { favorites: recipeId } },
      { new: true }
    )
  } else {
    updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { favorites: recipeId } },
      { new: true }
    )
  }
  const recipe = await getRecipe(recipeId)

  const updatedUserObject = updatedUser.toObject()

  console.log(updatedUserObject)
  return { ...updatedUserObject, recipeName: recipe.name }
}

const getFavoritesOfUser = async (id) => {
  if (id) {
    return await getUserFavorites(id)
  } else {
    return []
  }
}

export { favoriteRecipe, getFavoritesOfUser, loginUser, logOut, registerUser }
