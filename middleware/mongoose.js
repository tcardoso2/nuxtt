//Import the mongoose module
import mongoose from 'mongoose'
import users from './models/user'
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
        users.insertMany(data, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`${module.id}: ${result.length} user(s) inserted successfully`)
            }
        });
    });
}