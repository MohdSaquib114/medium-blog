import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
 
type LoadingType =boolean
interface BlogType {
    
    id: string,
    title: string,
    content: string,
    published: boolean,
    author: {
        name: string
    }
}
 export const useBlogs =() => {

    const [loading,setLoading] = useState<LoadingType>(true)
    const [blogs,setBlogs] = useState<BlogType[]>([])

    useEffect(()=>{
      console.log(localStorage.getItem("token"))
      axios.get(`${BACKEND_URL}/api/v1/blog/blogs`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
     } }).then(res=> {
        setBlogs(res.data.blogs)
        console.log(res)
        setLoading(false)
      })

    },[])

    return {
        loading,
        blogs
    }
 }