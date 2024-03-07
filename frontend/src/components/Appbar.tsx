import { Link } from "react-router-dom";
import Avatar from "./Avatar";


export default function Appbar() {
  return (
    <div className="border-b flex justify-between px-10 py-4">
       <Link to={"/blogs"} className="cursor:pointer text-slate-800 font-bold text-xl">
        Medium
       </Link>
       <div>
        <Link to={"/publish"} className="text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 " >
        New
        </Link>
        <Avatar name="Saquib"  />
       </div>
    </div>
  )
}
