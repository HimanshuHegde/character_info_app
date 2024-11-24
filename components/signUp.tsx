'use client'
import { signUp } from '@/backend';
import '@/styles/login.css'
import { useState } from 'react';
export default function SignUp({set}:{set:(s:string)=>void}){
    let [result,setResult] = useState("")
    return(
        <div className='siContainerC'>
            <div className="siContainer"> 
                <form onSubmit={async(e)=>{
                    let data = Object.fromEntries(new FormData(e.currentTarget).entries());
                    e.preventDefault();
                    const response = await fetch('/api/register',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(data)
                    })
                    // console.log(response.ok , data)
                    if(response.ok){
                        setResult("SignUp successfull.")
                    }else{
                        setResult("User already exists");
                    }
                    if(response.status == 200){
                        set("signIn")
                    }
                }}>
                    <h1>Sign Up</h1>
                    <label htmlFor="name">Name</label>
                    <input id="name"type="name" name='name' required={true}/>
                    <label htmlFor="email">Email</label>
                    <input id="email"type="email" name='email' required={true}/>
                    <label htmlFor="password">Password ( minimum of 8 character )</label>
                    <input id="password" type="password" name='password' minLength={8} required={true}/>
                    <button type="submit">SignUp</button>
                    <p>Already have an account? <a onClick={
                        ()=>{
                           
                            set("signIn")
                        }
                    }>logIn</a></p>
                </form>
                {
                    <p> {result} </p>
                }
            </div>
        </div>
    
    )
}