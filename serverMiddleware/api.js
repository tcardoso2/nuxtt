//TODO: This is just a prototype test, the actual one should call another library for the mongoose stuff
import mongoose from '../middleware/mongoose'
import Users from '../middleware/models/user'


export default {
  path: '/api/users',
  async handler(req, res) {
    
    mongoose() //Starts the connection

    let doc;
    let url = req.url.replace(/^\/+/, '');
    switch(req.method) {
      case "GET":
        doc = await getMethods(url)
        break
      case "POST":
        break
      case "PUT":
        doc = await putMethods(url, req.body)
        break
      case "DELETE":
        break
      default:
        break
    }

    res.end(doc ? JSON.stringify(doc) : '{}')
  }
}

async function getMethods(url) {
  let doc
  switch(url) {
    case '': 
      doc = await Users.find().exec()
      break
    default:
      //Search by id... Find a better way... use Express?
      if(url.indexOf("?id=") >= 0) {
        let id = url.split("?id=")[1];
        doc = await Users.findOne({ _id: id }).exec()
      } else {
        doc = await Users.findOne({ name: url }).exec()
      }
      break
  }
  return doc
}

async function putMethods(url, body) {
  let doc
  switch(url) {
    case '': 
      doc = await Users.create(JSON.parse(body).user)
      break
    default:
      break
  }
  return doc
}