const express=require('express')
const router=express.Router()
const crud_products=require('../model/schema')
const bodyParser=require('body-parser')

const multer=require('multer')
const path=require('path')



//this is middleWare use to encode the form&body request value //example req.body from form
router.use(bodyParser.urlencoded({extended:false}));
router.use(express.json())


//for upload file
router.use(express.static('upload'))


//upload img logic
// img upload
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./upload")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      return cb(null,`${uniqueSuffix}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage:Storage })







router.post('/createProduct',upload.single('img'),async(req,res)=>{
 
   
    try{
        const productData=new crud_products({
            name:req.body.name,
            price:req.body.price,
            img:req.body.img,
            detail:req.body.detail
        })
        //or simply second method
       // const productData=new userSchema(req.body)
      //  const token= await productData.generateToken()
       const create= await crud_products.create(productData)
     if(create){
      return   res.status(200).json(productData)
     }
        
    }
   
    catch(err){
    return  res.status(400).json('false')
    }
})







//Get the data
router.get('/productsData',async(req,res)=>{
 try{
  let Data=await crud_products.find({})
  if(Data){
   return  res.status(200).json({data:Data})

  }
    return res.status(400).json('data not found')
  
 }
 catch(e){
  res.status(400).json({msg:e})
 }

})



//Get the single Data
router.get('/productsData/:id',async(req,res)=>{
 try{
  const _id=req.params.id
  let Data=await crud_products.findOneById({_id})
  if(Data){
   return  res.status(200).json({data:Data})

  }
    return res.status(400).json('data not found')
  
 }
 catch(e){
  res.status(400).json({msg:e})
 }

})





//Delete the data by id
router.delete('/deleteProduct/:id',async(req,res)=>{
 try{
  const _id=req.params.id
  
  await crud_products.findByIdAndDelete({_id})
  

   return res.status(200).json({msg:'success'})
 
 }
 catch(e){
  res.status(400).json({
    msg:e
  })
 }
})







 

module.exports=router;