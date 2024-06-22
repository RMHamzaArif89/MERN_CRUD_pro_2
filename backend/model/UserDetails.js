require('dotenv').config()
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const mernUser= new mongoose.Schema({
    //these are the names of input...name='name'
    name:{
        type:String,
        // required:true

    },
    age:{
        type:Number,
        // required:true

    },
    email:{
        type:String,
        // required:true

    },
    password:{
        type:String,
        // required:true

    },

    

})

//hash password using bcrypt
mernUser.pre("save", async function(next){
    if(this.isModified('password')){
        this.password=  await bcrypt.hash(this.password,10)
        console.log('bcrypt password',this.password)
    }
    next()
})





//jsonwebtokengenerate
mernUser.methods.generateToken=async function(){
    try{
        // if(this.include(token)){
        //     return 
        // }
        const token= jwt.sign({_id:this._id},process.env.TOKEN_SECRET_KEY, {expiresIn:'2m'})
        
        // this.tokens=this.tokens.concat({token})
        return token
        
    
    } catch{
res.send('error occur')
    }
}

//jsonwebtokengenerate
mernUser.methods.generateRefreshToken= async function(){
    try{
        // if(this.include(token)){
        //     return 
        // }
        const refreshToken = jwt.sign({_id:this._id},process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn:'5m'})
        
        // this.tokens=this.tokens.concat({refreshTtoken})
        return refreshToken
        
    
    } catch{
res.send('error occur')
    }
}


// mongoose collection name specfied//created the new collection|table
const UserDetail= new mongoose.model("mern_userDetail",mernUser)

//export the schema that will be import in the main.js file
module.exports=UserDetail;
