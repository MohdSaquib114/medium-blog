import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SignupInput = {
    name :string,
    email:string
    password:string
}

export default function Auth({type}:{type:"signup" | "signin"}) {
    const [postInputs,setPostInputd] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const notify = (message:string) => toast(message);
   
    async function sendRequest()
    {
        try{
       const response = await axios.post(`${BACKEND_URL}/api/v1/${type==="signup"?"signup":"signin"}`, postInputs)
     
       const {token} = response.data
       console.log(token)
       localStorage.setItem("token", token)
     
       navigate("/blogs")
        }catch(e:unknown){
         notify(e.message)
        }
    }
  return (
    <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                  <div className=" text-3xl font-extrabold">
                {type === "signup"?  "Create an account":"Login to your account"}
                  </div>
                  <div className="text-slate-400 text-center mt-2">
               {type === "signup"?  "Already have an account?" : "Dont have an account?"}
                  <Link className=" underline" to={type === "signup"?"/signin":"/signup"}>{type === "signup"? " Login":" Sign in"}</Link>
                  </div>
            </div>
            <div className="pt-8">

            <LabelledInput type="text" label={"Name"} placeholder="Type your name..." onChange={(e)=>{
                setPostInputd({
                    ...postInputs,
                    name:e.target.value
                    
                })
            }} />
              <LabelledInput type="email" label={"Username"} placeholder="example@gmail.com" onChange={(e)=>{
                  setPostInputd({
                      ...postInputs,
                      email:e.target.value
                      
                    })
                }} />
              <LabelledInput type="password" label={"Password"} placeholder="12345" onChange={(e)=>{
                  setPostInputd({
                      ...postInputs,
                      password:e.target.value
                      
                    })
                }} />
                <button onClick={sendRequest} type="button" className="mt-4  w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signin"?`Sign In`:`Sign Up`}</button>
                <ToastContainer />
                </div>
                </div>
        </div>
    </div>
  )
}

interface LabelledInputType {
    label:string,
    placeholder:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void,
    type:string
    
}

function LabelledInput({label, placeholder,onChange,type}:LabelledInputType){
    return  <div className="pb-4">
    <label  className="block mb-2 text-sm font-bold text-gray-900 ">{label}</label>
    <input onChange={onChange} type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
</div>
}