import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { zValidator } from '@hono/zod-validator';
import {signupInput,signinInput,blogInput,updateblogInput,paramSchema} from "@msm_saq/common"
import { cors } from 'hono/cors';



const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string

  },
  Variables:{
    userId:string,
    
  }
}>()
app.use("/*", cors())
app.use("*", async (c,next) => {
	const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next()
})

app.use("api/v1/blog/*", async (c,next) => {
  const auth = c.req.header("authorization")
  if(!auth) {c.status(401);
    return c.json({error:"Token is not provided"})
  }
  const token:string = auth.split(" ")[1]
  const decoded = await verify(token,c.env.JWT_SECRET)
  if(!decoded){
    c.status(401);
    return c.json({error:"you are not authenticated"});

  }
  c.set("userId",decoded.userId)
  await next();

} )

app.post("/api/v1/signup",zValidator("json",signupInput ),async (c) => {

  const prisma = c.get("prisma");
   const body = c.req.valid("json")
   const encodedPassword = new TextEncoder().encode(body.password)
   const encryptedPassword = await crypto.subtle.digest({
    name:"SHA-256"
   },
   encodedPassword
   )
   const stringifiedPassword = new TextDecoder().decode(encryptedPassword)
   const res = await prisma.user.create({
    data:{
      name:body.name,
      email:body.email,
      password:stringifiedPassword
    }
   })
   const payload =  {
    userId : res.id
   }
   const token = await sign(payload,c.env.JWT_SECRET)
   return c.json({
    token:token
   })
   
} )



app.post("api/v1/signin",zValidator("json",signinInput),async (c) => {

  const prisma = c.get("prisma");
  const body = c.req.valid("json");
  const encodedPassword = new TextEncoder().encode(body.password)
   const encryptedPassword = await crypto.subtle.digest({
    name:"SHA-256"
   },
   encodedPassword
   )
   const stringifiedPassword = new TextDecoder().decode(encryptedPassword)
  const user = await prisma.user.findUnique({
    where:{
      email:body.email,
      password:stringifiedPassword
    }
  })
  if(!user){
    return c.json({error:"User not found or does not exist"})
  }
  const payload = {
    userId:user.id}
  const token = await sign(payload, c.env.JWT_SECRET)
return c.json({token:token})
} )


app.post("api/v1/blog",zValidator("json", blogInput)
, async (c) => {
  const userId = c.get("userId")
  const {title,content} = c.req.valid("json")
  const authorId = c.get("userId")
  const prisma = c.get("prisma")
  const blog = await prisma.blog.create({
    data:{
   title,
   content,
   authorId
    }
  })
  return c.json({
    id:blog.id
  })

} )



app.put("api/v1/blog",zValidator("json",updateblogInput ),async (c) => {

  const {id,title,content} = c.req.valid("json")
  const prisma = c.get("prisma")
  const blog = await prisma.blog.create({
    where:{
id:id
    },
    data:{
   title,
   content,
  
    }
  })
  return c.json({
    id:blog.id
  })


} )

app.get("/api/v1/blog/blogs",async (c)=>{
  try{

    const prisma = c.get("prisma");
    const blogs = await prisma.blog.findMany({
      select:{
        id:true,
        title:true,
        content: true,
        published: true,
        author:{select:{
          name:true
          }
        }

      }
    })
    return c.json({
      blogs:blogs
    })
  }catch(e){
    c.status(400)
    return c.json({
      error:"Error while fetchin"
    })
  }
})
app.get("api/v1/blog/:id",zValidator("param",paramSchema 
),async(c) => {
  try{

    const {id} =  c.req.valid("param")
    const prisma = c.get("prisma")
    
    const blog = await prisma.blog.findFirst({
      where:{
        id : id
      }
    })
    return c.json({
      blog:blog
    })
  }catch(e){
    c.status(411)
    return c.json({error:"Internal Error or something went wrong"})
  }

} )


export default app

//