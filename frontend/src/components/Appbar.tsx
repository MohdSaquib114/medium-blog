import Avatar from "./Avatar";


export default function Appbar() {
  return (
    <div className="border-b flex justify-between px-10 py-4">
       <div>
        Medium
       </div>
       <div>
        <Avatar name="Saquib"  />
       </div>
    </div>
  )
}
