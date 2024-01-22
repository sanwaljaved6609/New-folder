// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//     task:{
//         firstname: {type: String},
//         lastname: {type: String},
//         email: {type: String, required: true},
//         password: {type: String, required: true}
//     }
// });

// module.exports = mongoose.model("user", taskSchema)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
