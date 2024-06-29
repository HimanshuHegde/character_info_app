"use client"
// import { useEffect,useState } from "react"
import Image from "next/image";
export default function Navigation(){
    // const [nav,setNav] = useState('nav');
    // useEffect(()=>{
    //     const handleScroll = ()=>{
    //         if(window.scrollY>=(window.innerHeight)){
    //             setNav('nav1')
    //         }
    //     }
    //     window.addEventListener('scroll',handleScroll);
    // },[])
    return( 
        <>
            <nav className='nav' >
                <Image className="logo" src="/Made-In-Abyss-Logo.png"
                width={640}
                height={426}
                alt="logo"
                />
                 <div className="invisibleDiv"></div> 
               <div className="userLogin">
                <p>Sign Up/Login</p>
               </div>
               <div className="menu">

                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
               </div>
            </nav>
            
        </>
    )
}