"use client"
import Image from "next/image";
import { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import UpdateF from "./updateForm";
import Link from "next/link";
export default function Navigation(){
    const {data:session,status} = useSession();
    let [show,setShow] = useState("");
    let [edit,setEdit] = useState(false);
    let [login,setLogin] = useState(false)
    return( 
        <>
                <a href="/" className="logoL">
                <Image className="logo" src="/Made-In-Abyss-Logo.png"
                width={640}
                height={426}
                alt="logo"
                />
                </a>
            <nav className='nav' >
                { !session?.user&&<div className="userLogin"> {!login?<button onClick={
                    ()=>{
                        setShow("signIn");
                        setLogin(true)
                    }
                }>Sign Up/Login</button>:<button onClick={
                    ()=>{
                        setShow("");
                        setLogin(false)
                    }
                }>Close</button> }</div>|| session?.user?.name!='admin'&&(<>
                
                
                {!edit?<button className="edit" onClick={
                    ()=>{
                        setEdit(true)
                    }
                }>Edit</button>:
                <button className="edit" onClick={
                    ()=>{
                        setEdit(false)
                    }
                }>Close</button>}
                <a
                href="/userNotification"><button className="edit">notification</button></a>
                <div className="user" onClick={
                    ()=>{
                        signOut();
                    }
                }>  {session?.user?.name}</div>
                </>)||session?.user?.name=="admin"&&<div className="admin">{!edit?<button className="edit" onClick={
                    ()=>{
                        setEdit(true)
                    }
                }>Edit</button>:
                <button className="edit" onClick={
                    ()=>{
                        setEdit(false)
                    }
                }>Close</button>}
                <a
                href="/notification"><button className="edit">notification</button></a>
                <div className="user" onClick={
                    ()=>{
                        signOut();
                    }
                }>  {session?.user?.name}</div>
               </div> }
            </nav>
            {edit&&<UpdateF/>}
            {show=="signIn"?<SignIn set={setShow} />:show=="signUp"?<SignUp set={setShow}/>:<></>}
            
            
        </>
    )
}

