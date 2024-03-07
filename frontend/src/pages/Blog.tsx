import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import Fullblog from "../components/Fullblog"

export const Blog=  () =>{
    const {id} = useParams()
 
 const {loading,blog} = useBlog({id})
if(loading){
    return <div>
        Loading...
    </div>
}else{

    return <div>
       <Fullblog  blog={blog}/>
    </div>
    }
}