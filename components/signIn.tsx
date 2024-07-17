'use client'
import '@/styles/login.css'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
export default function SignIn({set}:{set:(s:string)=>void}){
    let [res,setRes] = useState('') 
    let router = useRouter()
    return(
        <>
            <div className="siContainer">
                <form onSubmit={
                    async(e)=>{
                        e.preventDefault()
                        let data = Object.fromEntries(new FormData(e.currentTarget).entries())
                       let a = await signIn("credentials",{redirect:false,...data});
                       if(a?.ok){
                        setRes('login successful');
                       }else{
                        setRes('login failed')
                       }
                        
                    }
                }>
                    <label htmlFor="email">Email</label>
                    <input id="email"type="email" name='email' required={true}/>
                    <label htmlFor="password">Password ( minimum of 8 character )</label>
                    <input id="password" type="password" name='password' minLength={8} required={true}/>
                    <button type="submit">Login</button>
                    <p>Create an account? <a onClick={
                        ()=>{
                            set("signUp")
                        }
                    }>signUp</a></p>
                </form>
                {res&&<p>{res}</p>}
            </div>

        </>
    
    )
}