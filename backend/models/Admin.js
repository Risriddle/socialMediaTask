const mongoose=require("mongoose")
const bcrypt = require("bcryptjs");

const AdminSchema=mongoose.Schema(
    {
        admin:{
            type:String,
            required:true
        },
        pwd:{
            type:String,
            
            required:true
        },
       
    }
);


AdminSchema.pre("save", async function (next) {
    if (!this.isModified("pwd")) return next(); 
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.pwd = await bcrypt.hash(this.pwd, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  

const Admin=mongoose.model('admin',AdminSchema)
module.exports=Admin;


