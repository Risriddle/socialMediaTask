import axios from 'axios'
const BASE_URL="https://social-media-task-chi-bice.vercel.app"

const api=axios.create({
         baseURL:BASE_URL,
         
         
})


export const uploadData=async(formData)=>{
         try{
            const res=await api.post("/upload",formData);
            console.log(res.data,"response in api submit data")
            return res.data
         }
         catch(error){
            console.log("Error while submitting data",error)
         }
}


export const verifyAdmin=async(data)=>{
       try{
            const res=await api.post("/verifyAdmin",data);
            console.log(res.data,"response in api verify admin")
            return res.data
       }
       catch(error){
         console.log("Error while verrifying admin: ",error)
       }
}




export const getData=async()=>{
   try{
      const res=await api.get("/getData");
      console.log(res.data,"response in api get data")
      return res.data
 }
 catch(error){
   console.log("Error while creating admin: ",error)
 }
}