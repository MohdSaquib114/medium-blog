import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Publish() {
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [laoding,setLoading] = useState(true)
  const navigate = useNavigate()
  const toaster = (mes:string) => toast(mes)
  async function postHandler(){
    if(title === "" || content === ""){
      toaster("Title or content is not provided")
      return
    }
    const post = {
      title,content
    }
   try{
    toaster("Sending")
    const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,post,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
     } })
     if(res.status === 200) toaster("blog posted")
    navigate(`/blog/${res.data.id}`)
    }catch(e){
  toaster(e.message)
     }
  }
  return (
  
<div>

<Appbar />
  <div className="flex  flex-col p-10 gap-10">
    <div>

<label  className="block mb-2 text-xl font-semibold text-slate-600 ">Title</label>
<input onChange={(e)=>setTitle(e.target.value)} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5  " placeholder="Title of Blog" />
    </div>
    <TextEditor onChange={(e)=>setContent(e.target.value)} />
    <button onClick={postHandler} type="submit" className=" px-5 py-2.5 text-sm font-medium text-center text-white bg-green-600 hover:bg-green-800 rounded-lg focus:ring-4 focus:ring-blue-200  ">
      Publish blog
  </button>
  <ToastContainer />
  </div>

</div>
   
  

  )
}

function  TextEditor({onChange}:{onChange: React.ChangeEventHandler,}){
  return <form className="">
      <div className="text-xl font-semibold text-slate-600">Content</div>
  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="px-4 py-2 bg-white rounded-b-lg ">
          
          <textarea  onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white  " placeholder="Write an article..." required /></div>
      </div>
 



</form>
}
