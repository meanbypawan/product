var express = require('express');
var router = express.Router();
const User = require('../model/user');
// http://localhost:3000/singup
// request:-{username: '',email: '',password: ''}
router.post("/signin",(request,response)=>{
   User.findOne({email: request.body.email,password: request.body.password})
   .then(result=>{
     if(result)
      return response.status(200).json({status: 'loging success', current_user: result});
     else
      return response.status(200).json({status: 'login failed'}); 
   })
   .catch(err=>{
     return response.status(500).json({error: 'Internal server error'});
   });
});
router.post("/signup",(request,response)=>{
   User.create({
     username: request.body.username,
     email: request.body.email,
     password: request.body.password
   }).then(result=>{
     return response.status(201).json(result);
   })
   .catch(err=>{
     return response.status(500).json({error: 'Internal Server Error'});
   });
});
module.exports = router;
