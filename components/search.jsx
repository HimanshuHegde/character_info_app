"use client"
import { useEffect } from "react"
export default function Search(){
    useEffect(()=>{
        let innerHeight = window.innerHeight;
    document.querySelector('.search').style.top = 10+innerHeight + 'px';
    
    window.addEventListener('scroll',()=>{
        if(window.scrollY>=window.innerHeight){
            document.querySelector('.search').style.position = 'fixed';
            document.querySelector('.search').style.top =0+'px';
        }else{
            document.querySelector('.search').style.position = 'absolute';
            document.querySelector('.search').style.top = 10+innerHeight + 'px';
        }
    })    
},[])
    return( <>
    <search className="search" >
        <form >
          <input type="text" name="search" placeholder="search..." />
        </form>
    </search>
      </>)
}