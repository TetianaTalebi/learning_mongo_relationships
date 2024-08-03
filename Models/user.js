const mongoose = require('mongoose');

// Connection events
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

// Connecting to MongoDB with the mongoose.connect() method
mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB')

// Connection error handling
.then(() => {console.log("Mongo connection is open!")})
.catch((err) => {
    console.log("Oh no, Mongo connection ERROR!!!");
    console.log(err);
})

// Defining a schema for a user that can have several addresses

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    // addresses property is set to an array because a user can have several addresses
    addresses: [
        // In this case we are embedding a sub document into a document
        {
        street: String,
        city: String,
        state: String,
        country: String
        }
    ]
});
