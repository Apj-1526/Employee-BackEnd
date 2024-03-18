const mongoose = require('mongoose')

const EmployerSchema = new mongoose.Schema({
	name : String,
	email : String,
	designation : String,
	gender : String,
	number : Number,
	courses : String

})
const EmployerModel = mongoose.model("Employers",EmployerSchema)
module.exports=EmployerModel;