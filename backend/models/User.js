const mongoose=require("mongoose")


const UserSchema=mongoose.Schema(
    {
        name:{
            type:String,
        },
        handle:{
            type:String,
            unique:true,
            required:true
        },
        images:{
            type:[String]
        },
       
    },{timestamps:true}
);

const User=mongoose.model('user',UserSchema)
module.exports=User;


