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

// Defining an async function makeTweets that hardcodes an instances of a user and a tweet
const makeTweets = async() => {
    try {
        const user = new User({
            username: 'User12345',
            age: 18
        });

        const tweet1 = new Tweet({
            text: 'lol 😂🤣',
            likes: 51
        });

        // Pushing an entire user into a tweet, 
        // but Mongoose is going to store only a user's id on a tweet in the database

        tweet1.user = user; 

        await user.save();
        await tweet1.save();

        console.log(user);
        console.log(tweet1);

    } catch (err) {
        console.log("Oh no, something went wrong with making a user and a tweet");
        console.log(err);
    }
    
}

// makeTweets();

// The function make2ndTweet hardcodes the 2nd tweet for a user 'User12345'
const make2ndTweet = async() => {
    try {
        const user = await User.findOne({username: 'User12345'});

        const tweet2 = new Tweet({
            text: 'ha ha ha 😍',
            likes: 123
        });

        tweet2.user = user;
        
        await tweet2.save();

        console.log(tweet2);

    } catch (err) {
        console.log("It is a problem with making the 2nd tweet");
        console.log(err);
    }
}

make2ndTweet();