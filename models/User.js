const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

		name : String,
		email:String,
		number : Number,
		gender:String,		
})
const UserModel = mongoose.model("employers",UserSchema)
module.exports = UserModel