//TODO: This is just a prototype test, the actual one should call another library for the mongoose stuff
import mongoose from 'mongoose'
import Users from '../middleware/models/user'
import connection from '../.mongodb.json'


export default {
  path: '/api',
  handler(req, res) {
    res.end('Everything ok!')
  }
}
/*export default function (context) {
  console.log(context.route)
  switch(context.route.path) {
    case '/users':
      const doc = await Users.findOne({ name: "John" }).exec()
      context.res.end(doc)
      break
    default:
      break
  }
  context.res.end('Everything ok!')
}*/