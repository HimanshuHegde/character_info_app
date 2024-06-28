"use client"
import { useEffect,useState } from "react"
export default function Navigation(){
    const [nav,setNav] = useState('nav');
    useEffect(()=>{
        const handleScroll = ()=>{
            if(window.scrollY>=(window.innerHeight)){
                setNav('nav1')
            }
        }
        window.addEventListener('scroll',handleScroll);
    },[])
    return( 
        <>
            <nav className={nav} >
               
            </nav>
            
        </>
    )
}