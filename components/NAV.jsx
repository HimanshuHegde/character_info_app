"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import UpdateF from "./updateForm";
import Link from "next/link";
import Search from "./search";
import { useSearchParams } from "next/navigation";
import Sidebar from "./sidebar";
export default function Navigation(){
    const {data:session,status} = useSession();
    let useParam = useSearchParams();
    let [show,setShow] = useState("");
    // let [edit,setEdit] = useState(false);
    let [login,setLogin] = useState(false)
    useEffect(()=>{

        let navbar = document.querySelector('.nav');
        if(navbar){
            navbar.classList.add('active');
        }
    },[])
    // useEffect(()=>{
    //     let a = document.querySelector('.nav');
    //     SetTest(a.style.width);
    //     if (a &&a.style.width === '0%') {
    //         a.style.width = '80%';
    //         a.style.opacity = '1';
    //     }
    // },[test])
    return( 
        <>
            <nav className='nav'>
                
                <a href="/" className="logoL">
                <Image className="logo" src="/Made-In-Abyss-Logo.png"
                width={640}
                height={426}
                alt="logo"
                />
                </a>
                <div>
                <Search d={useParam.get("name")?.toString()}/>
                </div>
                {/* <div className="navRight">
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
               </div> */}
               <button className="Navmenu" onClick={
                   ()=>{
                       let sidebar = document.querySelector('.sidebar');
                       sidebar.classList.add('active');
                       
                   }
               }><i className="uil uil-bars"></i></button>
            </nav>
            {show=="signIn"?<SignIn set={setShow} />:show=="signUp"?<SignUp set={setShow}/>:<></>}
            
            <Sidebar/>
        </>
    )
}

