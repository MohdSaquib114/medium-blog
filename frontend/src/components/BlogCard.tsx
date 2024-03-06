
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

interface BlogCardProps {
    authorName : string;
    title: string;
    content:string;
    publishedDate : string,
    id:string

}

export default function BlogCard({authorName,title,content,publishedDate,id}:BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div className='  border-b border-slate-200 p-4 pb-6 flex flex-col gap-3 w-screen max-w-screen-md  cursor-pointer'>
      <div className='flex'>
        
       <Avatar name = {authorName} /> 

    
       <div className=' font-extraligth pl-2'>
        {authorName} 
        </div> 
        <div className='flex justify-center flex-col'>
            <div className='h-1 w-1 bg-slate-400 rounded-full'>

            </div>
        </div>
        <div className='font-thin pl-2 text-slate-500'>

        {publishedDate}
        </div>
      </div>
      <div className='text-xl font-semibold mt-4'>
        {title}
      </div>
      <div className='text-md font-thin mb-4'>
        {content.length >200 ?`${content.slice(0,200)}... Click to read more. `:content}
      </div>
      <div className='text-slate-500 text-sm font-thin'>
        {`${Math.ceil(content.length/100)} minutes read` }
      </div>
   
    </div>
    </Link>
  )
}
