const express = require('express');
let app = express()
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken')
const verifyToken = require ('../middleware/verifyToken')

const User = require('../models/User')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
let SECRETKEY = process.env.SECRET_KEY

app.post('/register', async (req, res)=>{
	const {email, password} = req.body
   const saltRounds = 10;
    let user = await User.findOne({ email:email });
    if (user) {
      let {_id} = user
      const match = await bcrypt.compare(password, user.password);
      if(match){
        jwt.sign({id:_id}, SECRETKEY, /*{ expiresIn: 3600 },*/ (err, token)=>{  
          if(token){
            res.json({
              status:true,
              id:_id,
              token
            })                   
          }          
        });
      }
      else{
        res.json({status:false, message:'Password is not valid'})
      }
    } else {
      bcrypt.genSalt(saltRounds, (err, salt)=> {
        bcrypt.hash(password, salt, async (err, hash)=> {            
          user = new User({
            email: email,
            password: hash,
            created_at: new Date()
          });
          let newuser = await user.save();
          if(newuser){
            let {_id} = newuser
            jwt.sign({id:_id}, SECRETKEY, /*{ expiresIn: 3600 },*/ (err, token)=>{  
              if(token){
                res.json({
                  status:true,
                  id:_id,
                  token
                })                   
              }          
            });
          }
        });
      });
    }
})

app.put('/', verifyToken, async (req, res)=>{
  const {mobile, address, designation, ...all} = req.body
  let userData = {user_info:{mobile, designation, address}, ...all}  
  try{
    const post = await User.findByIdAndUpdate({
      _id:req.user.id
    },userData,{
      new:true      
    })
    res.send(post)
  }
  catch(err){
    res.json(err)
  }
})

app.get('/', verifyToken, async (req, res)=>{
  let user = await User.findOne({ _id:req.user.id});
  res.send(user)
})

app.get('/:id', async (req, res)=>{
  let user = await User.findOne({ profile_name:req.params.id});
	res.send(user)
})

module.exports= app