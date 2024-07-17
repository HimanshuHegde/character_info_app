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
    return( 
        <>
            <nav className='nav' >
                <Image className="logo" src="/Made-In-Abyss-Logo.png"
                width={640}
                height={426}
                alt="logo"
                />
                { !session?.user&&<div className="userLogin"> <button onClick={
                    ()=>{
                        setShow("signIn");
                    }
                }>Sign Up/Login</button></div>|| session?.user?.name!='admin'&&(<><button className="edit" onClick={
                    ()=>{
                        setEdit(true)
                    }
                }>Edit</button>
                <div className="user" onClick={
                    ()=>{
                        signOut();
                    }
                }>  {session?.user?.name}</div>
                </>)||session?.user?.name=="admin"&&<div className="admin"> <button className="edit">add</button>
                <Link
                href="/notification"><button className="edit">notification</button></Link>
                <div className="user" onClick={
                    ()=>{
                        signOut();
                    }
                }>  {session?.user?.name}</div>
               </div> }
            </nav>
            {edit&&<UpdateF/>}
            {show=="signIn"?<SignIn set={setShow}/>:show=="signUp"?<SignUp set={setShow}/>:<></>}
            
            
        </>
    )
}

