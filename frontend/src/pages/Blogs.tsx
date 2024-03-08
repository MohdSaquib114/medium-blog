
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlogs } from '../hooks'
import BlogSkeleton from '../components/BlogSkeleton'
 
 export default function Blogs() {
   const{   loading,  blogs} =useBlogs()
  
   if(loading) {
    return <div >
        <Appbar/>
        <div className='flex justify-center mt-10' >
<div className='w-[50%] flex flex-col gap-10'>

    <BlogSkeleton />
    <BlogSkeleton/>
    <BlogSkeleton/>

</div>
        </div>
 
    </div>

   }else{
  
   return (
    <div>
<Appbar />
     <div className='flex justify-center'>
        <div >
            {blogs.map(blog=>
                 <BlogCard  key={blog.title + blog.id}
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
 