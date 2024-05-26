//this collection will be use to find filter or search the products|data ...
require('dotenv').config()
const mongoose=require('mongoose')


const crud_products= new mongoose.Schema({
    //these are the names of input...name='name'
    name:{
        type:String,
        // required:true

    },
    price:{
        type:Number,
        // required:true

    },
    img:{
        type:String,
        // required:true

    },
    detail:{
        type:String,
        // required:true

    },

    

})








// mongoose collection name specfied//created the new collection|table
const mern_product= new mongoose.model("mern_products",crud_products)

//export the schema that will be import in the main.js file
module.exports=mern_product;
