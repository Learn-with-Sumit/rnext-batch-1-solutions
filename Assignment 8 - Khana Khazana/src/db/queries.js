import { RecipeModel } from '@/models/Recipe.js'
import { UserModel } from '@/models/User.js'
import checkValidMongooseId from '@/util/checkValidMongooseId.js'
import bcrypt from 'bcryptjs'
import connectMongo from './conectMongo.js'

// register a user
const createUser = async (user) => {
  try {
    await connectMongo()

    const existingUser = await UserModel.findOne({ email: user.email })
    if (existingUser) {
      return {
        msg: 'user already exists',
      }
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(user.password, salt)
    const data = await UserModel.create({
      ...user,
      firstName: user.fname,
      lastName: user.lname,
      password: hashedPassword,
      favorites: [],
    })
    return data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// get a user
const findUser = async (credentials) => {
  try {
    await connectMongo()

    const user = await UserModel.findOne({ email: credentials.email })
    return user
  } catch (error) {
    console.error('Error finding user:', error)
    throw error
  }
}

// get all recipes
const getRecipes = async () => {
  try {
    await connectMongo()

    const recipes = await RecipeModel.find()
    return recipes
  } catch (error) {
    console.error('Error getting recipes:', error)
    throw error
  }
}

// single recipe
const getRecipe = async (id) => {
  try {
    await connectMongo()

    if (!checkValidMongooseId(id)) {
      return {
        msg: 'Invalid id',
      }
    }

    const recipe = await RecipeModel.findById(id)

    if (!recipe) {
      return {
        msg: 'Invalid id',
      }
    }

    return recipe
  } catch (error) {
    console.error('Error getting recipe:', error)
    throw error
  }
}

// recipe by category
const getRecipeByCategory = async (category) => {
  try {
    await connectMongo()

    const recipes = await RecipeModel.find({
      category: {
        $regex: new RegExp(category, 'i'),
      },
    })

    return recipes
  } catch (error) {
    console.error('Error getting recipe:', error)
    throw error
  }
}

// get current users favorites
const getUserFavorites = async (userId) => {
  try {
    await connectMongo()

    const user = await UserModel.findById(userId)

    return user.favorites
  } catch (error) {
    console.error('Error getting favorites:', error)
    throw error
  }
}

export {
  createUser,
  findUser,
  getRecipe,
  getRecipeByCategory,
  getRecipes,
  getUserFavorites,
}
