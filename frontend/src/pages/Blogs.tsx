
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlogs } from '../hooks'
 
 export default function Blogs() {
   const{   loading,  blogs} =useBlogs()
   if(loading) {
    return <div>
        Loading....
    </div>
   }else{
  
   return (
    <div>
<Appbar />
     <div className='flex justify-center'>
        <div >
            {blogs.map(blog=>
                 <BlogCard 
                 authorName={blog?.author.name}
                 title={blog.title}
                 content={blog.content}
                 id={blog.id}
                 publishedDate={"6 March 2024"}
                 />)}
      
  



     </div>
     </div>
       </div>
   )
}
 }
 