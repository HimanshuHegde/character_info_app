"use client"
import { useEffect } from "react"
export default function Search(){
    
    useEffect(()=>{
    window.addEventListener('scroll',()=>{
        if(window.scrollY>=window.innerHeight){
            document.querySelector('.search').style.position = 'fixed';
        }else{
            document.querySelector('.search').style.position = 'absolute';
        }
    })    
},[])
    return( <>
        <search className="search" onClick={()=>{
            window.scrollTo({
                top:window.innerHeight,
                left:0,
                behavior:"smooth"
            });
        }} >
            <input type="text" name="search" placeholder="SEARCH ..." />
        </search>
        </>)
}