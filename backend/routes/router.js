const express=require('express')
const router=express.Router()
const crud_products=require('../model/schema')
const bodyParser=require('body-parser')
const authenticateToken=require('../authenticateUser')
const cookieParser=require('cookie-parser')
const UserDetail=require('../model/UserDetails')
const multer=require('multer')
const path=require('path')
const bcrypt=require('bcryptjs')



//this is middleWare use to encode the form&body request value //example req.body from form
router.use(bodyParser.urlencoded({extended:false}));
router.use(express.json())
router.use(cookieParser())


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







router.post('/createProduct',authenticateToken,upload.single('img'),async(req,res)=>{
 
   console.log('create product')
    try{
      
     console.log(req.file)
        const productData=new crud_products({
            name:req.body.name,
            price:req.body.price,
            img:req.file.filename,
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
router.get('/productsData', authenticateToken,async(req,res)=>{
  
 try{
  let Data=await crud_products.find({})
  if(Data){
   return  res.status(200).json({data:Data})


  }
  console.log('not found data')
    return res.status(400).json('data not found')
    

  
 }
 catch(e){
  res.status(400).json({msg:e})
 }

})



//Get the single Data
router.get('/productsData/:id', authenticateToken,async(req,res)=>{
 try{
  const _id=req.params.id
  let Data=await crud_products.findById({_id})
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
router.delete('/deleteProduct/:id', authenticateToken,async(req,res)=>{
 try{
  console.log('delete')
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


//update the data by id
router.patch('/updateProduct/:id',authenticateToken,async(req,res)=>{
 try{
  const _id=req.params.id
  
  await crud_products.findByIdAndUpdate(
    {_id},{
    name:req.body.name,
    price:req.body.price,
    img:req.body.img,
    detail:req.body.detail
  })
  

   return res.status(200).json({msg:'success'})
 
 }
 catch(e){
  res.status(400).json({
    msg:e
  })
 }
})








router.post('/signup',async(req,res)=>{
 
  try{
    const emailExist=await UserDetail.findOne({email:req.body.email})
    if(emailExist){
      return  res.status(400).json('email already exist')
    }
      const userData=new UserDetail({
          name:req.body.name,
          age:req.body.age,
          email:req.body.email,
          password:req.body.password
      })
      //or simply second method
     // const userData=new userSchema(req.body)
     const token= await userData.generateToken()
     const refreshToken= await userData.generateRefreshToken()

     const create= await UserDetail.create(userData)
     const options= {
      httpOnly:true,
      secure:true,
      maxAge:100000,
      sameSite:'strict'
     }
   if(create){
    return   res.status(200)
    .cookie("accessToken", token,options)
    .cookie("refreshToken",refreshToken,options)
    .json(userData)
   }
      
  }
 
  catch(err){
  return  res.status(400).json('false')
  }
})


router.post('/login', async(req,res)=>{
// console.log('cookietoken',req.cookies.accessToken)

try{
  const email=req.body.email;
  const password=req.body.password;
  console.log('login',password)
  if(!email ||  !password){
    return  res.status(400).json('please fill the form feilds')
  }
  const data= await UserDetail.findOne({email:email})
  if(!data){
    console.log('not find data')
    return  res.status(400).json('invalid login details')
  }

 
  const passwordMatch= await bcrypt.compare(password,data.password)
  const token=await data.generateToken()
  const refreshToken= await data.generateRefreshToken()
  const options= {
    httpOnly:true,
    secure:true,
    maxAge:3000000,
    sameSite:'strict'
   }
   if(!passwordMatch){
    console.log('not match pwd')
   }

 

  if(passwordMatch){
      console.log('password match')
      return res.status(200)
      .cookie("accessToken", token, options)
      .cookie("refreshToken",refreshToken,options)
      .json({
        id:data._id
      })
// console.log('okay')
      
  }else{
    return  res.status(400).json('invalid login details')
      console.log('not okay')
  }
}
catch(e){
  res.status(400).send(e)
}
  
})

router.get('/logout', async(req,res)=>{
  console.log('logout enter')
  try{
   res.status(200).clearCookie('accessToken')
   .json('logout')
   
  }
  catch(err){
    res.status(400).json({msg:err})
  }
  
})



 

module.exports=router;