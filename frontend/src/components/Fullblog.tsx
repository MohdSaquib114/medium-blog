
import { BlogType } from "../hooks"
import Appbar from "./Appbar"
import Avatar from "./Avatar"


export default function Fullblog({blog}:{blog:BlogType}) {
  return (
    <div>
<Appbar />
<div className="flex justify-center p-10">

    <div className="lg:grid gap-5 grid-col-12 px-5 pt-20 w-full max-w-screen-2xl "> 
      <div className="col-start-1 col-end-5 border-b pb-8 lg:border-none lg:pb-0">
        <div className="text-3xl lg:text-5xl font-extrabold">
            {blog.title}
        </div>
        <div className="text-slate-500 font-medium pt-8">
            Posted on 23rd Dec
        </div>
        <div className="text-slate-600 font-semibold pt-4 lg:text-lg">
            {blog.content}
        </div>
      </div>
      <div className="col-start-7  mt-10 lg:mt-0">
        Author
      
    <div className="flex gap-4">
        <div className=" self-center">
            <Avatar name={blog.author.name} />
        </div>
        <div>

    <div className="text-xl font-medium">
            {blog.author.name}
        </div>
        <div className="text-slate-500 font-normal text-md mt-2">
        Adventurer by heart, writer by passion, and dreamer by nature. I'm on a perpetual journey of self-discovery, exploring the depths of my soul and the wonders of the world around me.
        </div>
       </div>
    </div>
      </div>
    </div>
</div>
    </div>
  )
}
