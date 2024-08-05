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

// Defining a Mongoose Schema for a product

const productSchema = new mongoose.Schema({
    name: {type: String,
        required: true
    },
    price: {type: Number,
        required: true,
        min: 0
    },
    season: {type: String,
        lowercase: 'true',
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

// Defining a Mongoose Model for a product

const Product = mongoose.model('Product', productSchema);
