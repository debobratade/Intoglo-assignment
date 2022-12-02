const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({

    fname: {
      type: String, 
      required: true,
      trim:true
    },
    lname: {
      type:String, 
      required: true,
      trim:true
    },
    email: {
      type: String, 
      required:true, 
      unique:true,
      trim:true
    },
    profileImage: {
      type:String, 
      required:true
    }, 
    phone: {
      type:String, 
      required:true, 
      unique:true,
      trim:true
    }, 
    password: {
      type:String,
      required:true, 
      min: 5, 
      max: 15,
      trim:true
    }, 
    isDeleted: {
      type: Boolean,
      default: false,
    },
   
  }, { timestamp:true})


  module.exports= mongoose.model('User', userSchema)