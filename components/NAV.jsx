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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Sidebar from "./sidebar";
import SearchResult from "./searchResult";
export default function Navigation(){
    const {data:session,status} = useSession();
    let useParam = useSearchParams();
    let [show,setShow] = useState("");
    // let [edit,setEdit] = useState(false);
    let [login,setLogin] = useState(false)
    const path = usePathname();
    useEffect(()=>{

        let navbar = document.querySelector('.nav');
        if(navbar){
            navbar.classList.add('active');
        }
        if (path === '/characters' || path === '/artifacts' || path === '/whisltes') {
            navbar.style.position = "absolute";
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
                
                     
                     { !session?.user?
                     <div className="navRight">
                     <div className="userLogin"> {!login?<button onClick={
                         ()=>{
                             setShow("signIn");
                             setLogin(true)
                         }
                     }>Sign Up/Login</button>:<button onClick={
                         ()=>{
                             setShow("");
                             setLogin(false)
                         }
                     }>Close</button> }</div></div>:
                     <button className="Navmenu" onClick={
                        ()=>{
                            let sidebar = document.querySelector('.sidebar');
                            sidebar.classList.add('active');
                            
                        }
                    }><i className="uil uil-bars"></i></button>
                }
              
            </nav>
            {show=="signIn"?<SignIn set={setShow} />:show=="signUp"?<SignUp set={setShow}/>:<></>}
            
            <Sidebar/>

            {useParam.get("name")&&usePathname()!='/'&&
      <SearchResult/>}  
        </>
    )
}

