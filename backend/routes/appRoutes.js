const express=require("express")
const Router=express.Router()
const appController=require("../controllers/appController")

Router.post("/upload",appController.uploadData)
Router.get("/getData",appController.getData)
Router.post("/verifyAdmin",appController.verifyAdmin)

module.exports=Router;