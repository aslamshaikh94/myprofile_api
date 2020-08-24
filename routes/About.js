const express = require('express');
let app = express()

const About = require('../models/About')
const User = require('../models/User')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.put('/', async (req, res)=>{
	 // Check if this About already exisits   
  try{
    var myquery = { email: 'aslam2@gmail.com' }
    const post = await User.findByIdAndUpdate({
      _id:'5edcd2cb2021ff17e0403cfb'
    },req.body,{
      new:true      
    })
    res.send(post)
  }
  catch(err){
    res.json(err)
  }
})

app.get('/', (req, res)=>{
	About.find((err, result)=>{
		res.json(result)
	})
})

module.exports= app