const express = require('express');
const router = express.Router();
const Category = require('../model/category');
// http://localhost:3000/category/add-categort
// request-{categoryName: ''}
const tokenVerification = require('../middleware/token_verification');

router.post("/delete-category",tokenVerification.verifyToken,(request,response)=>{
   Category.deleteOne({_id: request.body.cid})
   .then(result=>{
      return response.status(200).json({status: 'success'});
   }).catch(err=>{
       return response.status(500).json({error: 'Internal server error'});
   });
});
router.get("/category-list",tokenVerification.verifyToken,(request,response)=>{
  Category.find()
  .then(result=>{
      return response.status(200).json(result);
  }).catch(err=>{
      return response.status(500).json({error: 'Internal Server Error'});
  });
});
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