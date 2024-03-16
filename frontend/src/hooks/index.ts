import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
 
type LoadingType =boolean
export type BlogType ={
    
    id: string,
    title: string,
    content: string,
    published: boolean,
    author: {
        name: string
    }
}

export const useBlog =({id}:{id:string|undefined}) => {

        const [loading,setLoading] = useState<LoadingType>(true)
        const [blog,setBlog] = useState<BlogType>({
          id: "",
          title: "",
          content: "",
          published: false,
          author: {
              name: ""
          }
        })
     
        useEffect(()=>{
      
          axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
         } }).then(res=> {
            console.log(res)
            setBlog(res.data.blog)
           
            setLoading(false)
          })
    
        },[id])
    
        return {
            loading,
            blog
        }
     }

 export const useBlogs =() => {

    const [loading,setLoading] = useState<LoadingType>(true)
    const [blogs,setBlogs] = useState<BlogType[]>([])

    useEffect(()=>{
      
      axios.get(`${BACKEND_URL}/api/v1/blog/blogs`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
     } }).then(res=> {
        setBlogs(res.data.blogs)
     
        setLoading(false)
      })

    },[])

    return {
        loading,
        blogs
    }
 }