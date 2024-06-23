import mongoose from 'mongoose'

const checkValidMongooseId = (id) => mongoose.Types.ObjectId.isValid(id)

export default checkValidMongooseId
