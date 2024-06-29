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
        <search className="search" >
            <input type="text" name="search" placeholder="SEARCH ..." />
        </search>
        </>)
}