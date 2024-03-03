import {z} from "zod"

export const signupInput  = z.object({
    name:z.string().optional(),
    email:z.string().email(),
    password:z.string()
  }) 

export const signinInput =  z.object({
     email:z.string().email(),
     password:z.string().min(6)

  }) 

export const blogInput = z.object({
    title:z.string(),
    content:z.string(),
    
  }) 

export const updateblogInput = z.object({
    id:z.string(),
    title:z.string(),
    content:z.string(),
    
  }) 

export const paramSchema = z.object({
    id:z.string()
})

export type SignupInput = z.infer<typeof signinInput>
export type SigninInput = z.infer<typeof signinInput>
export type BlogInput = z.infer<typeof blogInput>
export type UpdateblogInput = z.infer<typeof updateblogInput>
export type ParamSchema = z.infer<typeof paramSchema>
