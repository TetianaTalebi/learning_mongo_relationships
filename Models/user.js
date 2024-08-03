const mongoose = require('mongoose');

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB')
.then(() => {console.log("Mongo connection is open!")})
.catch((err) => {
    console.log("Oh no, Mongo connection ERROR!!!");
    console.log(err);
})