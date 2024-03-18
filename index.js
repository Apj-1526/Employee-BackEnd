const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee.js')
const EmployerModel = require('./models/Employers.js');
const UserModel = require('./models/User.js')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://aaromaljoju50:MongoDb1526@plantdashboard.nffujai.mongodb.net/employee?retryWrites=true&w=majority&appName=plantDashboard");

app.post('/login',(req,res)=>{
	const {email,password} = req.body;
	EmployeeModel.findOne({email:email})
	.then(user =>{
		if(user){
			if(user.password === password){
			
				res.json("Success")
			}else{
				res.json("The Password is incorrect")
			}
		}else{
			res.json("User not exists!!")
		}
	})
})



app.post('/register',(req,res)=>{
	EmployeeModel.create(req.body)
	.then(employees =>res.json(employees))
	.catch(err =>res.json(err))
})

app.get('/logout',(res,req)=>{
	req.session.destroy(err=>{
		if(err){
			res.status(500).json({message:'Logout Failed'})
		}else{
			res.status(200).json({message:'Logout Successfull'})
		}
	});
});


app.post('/create', async (req, res) => {
	try {
	 
	  const newEmployer = new EmployerModel({
		name: req.body.name,
		email: req.body.email,
		position: req.body.designation,
		gender: req.body.gender,
		number: req.body.number,
		course:req.body.courses
	  });
  
	
	  await newEmployer.save();
  
	  res.status(201).json({ message: 'Employer data saved successfully' });
	} catch (error) {
	  console.error('Error saving employer data:', error);
	 
	  res.status(500).json({ error: 'Internal server error' });
	}
  });

  app.get('/getUsers', async (req, res) => {
	try {
	  
	  const employees = await UserModel.find() 
	  .then(users =>res.json(users))
	  
	} catch (error) {
	  console.error('Error fetching employees:', error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  });

app.listen(3001,()=>{
	console.log("Server is running");
})