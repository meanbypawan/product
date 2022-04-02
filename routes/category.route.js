const express = require('express');
const router = express.Router();
const Category = require('../model/category');
// http://localhost:3000/category/add-categort
// request-{categoryName: ''}
const tokenVerification = require('../middleware/token_verification');
router.post('/add-category',tokenVerification.verifyToken,(request,response,next)=>{
  Category.create({
      categoryName: request.body.categoryName
  }).then(result=>{
      return response.status(201).json(result);
  })
  .catch(err=>{
      console.log(err);
      return response.status(500).json({error: 'Internal Server Error'});
  });
});
module.exports = router;