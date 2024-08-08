const mongoose = require('mongoose');

// Making a shortcut for mongoose.Schema
const Schema = mongoose.Schema;

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

const productSchema = new Schema({
    name: {type: String,
        required: true
    },
    price: {type: Number,
        required: true,
        min: 0
    },
    season: {type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

// Defining a Mongoose Schema for a farm

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product' // 'Product' is a name of the Product Model
    }]
});


// Defining a Mongoose Model for a product

const Product = mongoose.model('Product', productSchema);

// Defining a Mongoose Model for a farm

const Farm = mongoose.model('Farm', farmSchema);

// Making a few products

// const makeProducts = async () => {
//     try {
//         // Making an array of several products for seeding the data base
//         const productArray = [
//             {name: "Watermelon", price: 1.99, season: "Summer"},
//             {name: "Red apple", price: 2.33, season: "Fall"},
//             {name: "Asparagus", price: 1.50, season: "Spring"},
//             {name: "Strawberry", price: 3.05, season: "Spring"},
//             {name: "Potato", price: 0.90, season: "Fall"}
//         ]
//         const res = await Product.insertMany(productArray);

//         console.log(res);

//     }
//     catch (err) {
//         console.log("There is some problem with creating of the new products");
//         console.log(err);
//     }
// }

// makeProducts();

// Making an instance of a farm in database

// const makeFarm = async () => {
//     try {
//         const farm = new Farm({
//             name: "Full Belly Farm",
//             city: "Guinda, CA"
//         });

//         const strawberry = await Product.findOne({name: "Strawberry"});
//         farm.products.push(strawberry);

//         await farm.save();

//         console.log(farm);
//     }
//     catch (err) {
//         console.log("A problem happened while making a farm");
//         console.log(err);
//     }
// }

// makeFarm();

// Defining a function for adding another product to the farm
// The product is hardcoded for demo purposes

const addProduct = async () => {
    try {
        const farm = await Farm.findOne({name: "Full Belly Farm" });

        const watermelon = await Product.findOne({name: "Watermelon"});

        farm.products.push(watermelon);
        await farm.save();
        console.log(farm);

    } catch (err) {
        console.log("Something went wrong with adding another product to the farm");
        console.log(err);
    }
};

addProduct();