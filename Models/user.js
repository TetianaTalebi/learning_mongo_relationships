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
        // This line of code prevents Mongoose from creating a separate _id for each address
        _id: {_id: false},
        street: String,
        city: String,
        state: String,
        country: String
        }
    ]
});

// Making a User model
const User = mongoose.model('User', userSchema);

// Defining a function makeUser, 
// that is a demo of making an instance of a particular user by using
// a Model One-to-Many Relationships with Embedded Documents

const makeUser = async () => {
    try {
        const u = new User({
            first: 'Harry',
            last: 'Potter'
        });

        u.addresses.push({
            
            street: '123 Sesame St.',
            city: 'New York',
            state: 'NY',
            country: 'USA'
        });

        const res = await u.save();
        console.log(res);
    } catch (err) {
        console.log("Unable to make a user, something went wrong!!!");
        console.log(err);
    }
}

// makeUser();

const addAddress = async (id) => {
    try {
        const user = await User.findById(id);
        user.addresses.push(
            {
                street: '99 3rd St.',
                city: 'New York',
                state: 'NY',
                country: 'USA'
            }
        );
        const res = await user.save();
        console.log(res);

    } catch (err) {
        console.log("There is some error with adding an address to a user");
        console.log(err);
    }
}

addAddress('66aefb532533948ac591a69b');