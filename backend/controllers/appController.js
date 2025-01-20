const User=require("../models/User")
const Admin=require("../models/Admin")
const bcrypt = require("bcryptjs");
const { upload, uploadToS3 } = require("../config/s3Config");

exports.uploadData=[upload.array("images"),async(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "https://socialmediauploads.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
      return res.status(200).end(); 
  }
         const {name,handle}=req.body;
         const imageUpload=req.files.map(file=>uploadToS3(file));
         const imageUrls=await Promise.all(imageUpload);
        try{
         const newUser = new User({ name, handle, images: imageUrls });
        await newUser.save();
        req.io.emit("allUsers", await User.find());
        res.status(200).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error uploading images", error });
    }

}]

exports.getData=async(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "https://socialmediauploads.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
      return res.status(200).end(); 
  }
      try{
            const data=await User.find();
            console.log(data)
            return res.json(data);
      }
      catch(error){
       res.status(500).json({message:"error while fetching data",error})
      }
}


const verifyPassword = async (enteredPassword, storedHashedPassword) => {
  return await bcrypt.compare(enteredPassword, storedHashedPassword);
};


exports.verifyAdmin=async(req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "https://socialmediauploads.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
      return res.status(200).end(); 
  }
    const {admin,pwd}=req.body;
    console.log(admin,pwd)
    try{
        const data = await Admin.findOne({ admin: admin });
        console.log(data,data.pwd,"verify adminnnnnnnnnnnnnnnnnnnnnn")
        if (data && (await verifyPassword(pwd, data.pwd))) {
          console.log("Login Successful");
         return  res.json({valid:true})
        } else {
          console.log("Invalid Credentials");
         return  res.json({valid:false})
        }
    
    }
    catch(error){
    return  res.status(500).json({message:"error while fetching data",error})
    }
}









