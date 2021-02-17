import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let users
try {
  console.log(`${module.id}: Retrieving 'users' model from MongoDB...`);
  users = mongoose.model('users')
} catch (error) {
  console.log(`${module.id}: Does not exist? Underlying exception: ${error}`);
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

export default users