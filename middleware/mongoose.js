/**
 * Mongoose Middleware
 * ===================
 * Works directly with a MongoDB instance.
 * A ./mongodb.json file should exist in the root directory (git source code ignored) with the following
 * @example {
 *      "connection": "<user>:<pass>@<server>/your_namespace"
 * }
 * 
 * For scalability / decoupling reasons it might be best to either use queues for other backend to do the 
 * Handling with MongoDB, or using A JSON API, or other means of communucation to interate with such
 * back-end. Configuration should be added to allow this application to act as a single instance or work
 * with other instances as well
 */

//Import the mongoose module
import mongoose from 'mongoose'
import Users from './models/user'
import connection from '../.mongodb.json'

var data = [
  {
    name: "John",
    age: 21,
    location: "New York"
  },
  {
    name: "Smith",
    age: 27,
    location: "Texas"
  },
  {
    name: "Lisa",
    age: 23,
    location: "Chicago"
  }
];

export default function (context) {
    //Set up default mongoose connection
    var mongoDB = `mongodb+srv://${connection.connection}?retryWrites=true&w=majority`;
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    //Need to remove the emmiters, this should be done only once
    db.once('open', function() {
        //
        console.log(`${module.id} We are connected!`)
        Users.insertMany(data, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`${module.id}: ${result.length} user(s) inserted successfully`)
            }
        });
    });
}

export async function findUserByName(userName) {
    try {
        const doc = await Users.findOne({ name: userName }).exec();
        return doc;
    } catch (err) {
        // With `exec()`, the stack trace includes where in your code you
        // called `exec()`. Below is the stack trace:
        //
        // CastError: Cast to ObjectId failed for value "this is not a valid id" at path "_id" for model "band-promises"
        //   at new CastError (/app/node_modules/mongoose/lib/error/cast.js:29:11)
        //   at model.Query.exec (/app/node_modules/mongoose/lib/query.js:4331:21)
        //   at Context.<anonymous> (/app/test/index.test.js:138:42)
        //   at process._tickCallback (internal/process/next_tick.js:68:7)
        err.stack;
    }
}