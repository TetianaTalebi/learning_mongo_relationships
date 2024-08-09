const mongoose = require('mongoose');

// Making a shortcut for mongoose.Schema
const {Schema} = mongoose; // Destructuring const Schema from a mongoose object
// const Schema = mongoose.Schema;

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
});

// Defining a Schema for a user

const userSchema = new Schema({
    username: String,
    age: Number
});

// Defining a Schema for a tweet

const tweetSchema = new Schema({
    text: String,
    likes: Number,

    // When it's expected that it will be thousands and more children docs,
    // it's more efficient to store a reference to a parent on the child document
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User' // 'User' is a name of a user Model
    }
});

// Making 2 Models - for a user and for a tweet

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);