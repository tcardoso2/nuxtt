import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export default function() {
  let users
  try {
    console.log(`${module.id}: Retrieving 'users' model from MongoDB...`);
    users = mongoose.model('users')
  } catch (error) {
    console.log(`${module.id}: It seems the model is running for the first time? Underlying exception: ${error}`);
    users = mongoose.model('users', 
    new Schema({
      name: {
        type: String
      },
      age: {
        type: Number
      },
      location: {
        type: String
      }
    },
      { collection: "Users" }
    ))
  }
  return users  
}
