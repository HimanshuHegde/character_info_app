"use client"
import { search } from "@/backend"
import { useParams, usePathname, useSearchParams,useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
export default function Search({d}:(any)){
    const useParam = useSearchParams();
    const path = usePathname();
    const {replace} = useRouter();
    let handleSearch = useDebouncedCallback((e:(string|null))=>{
        let param = new URLSearchParams(useParam);
        e?param.set("name",e):param.delete("name");
        replace(`${path}?${param.toString()}`,{scroll:false});
    },300)
    
//     useEffect(()=>{
//     window.addEventListener('scroll',()=>{
//         let d = document.querySelector('.search') as HTMLElement;
//         if(window.scrollY>=window.innerHeight){
//             d.style.position = 'fixed';
//         }else{
//             d.style.position = 'absolute';
//         }
//     })    
// },[])
    return( <>
        <search className="search" onClick={()=>{
            if(!useParam.get("_id"))
            window.scrollTo({
                top:window.innerHeight+1,
                // left:0,
                behavior:"smooth"
                
            });
        }} >
            <input type="text" name="search" placeholder="SEARCH ..." onChange={
                (event)=>{
                    
                    handleSearch(event.target.value?event.target.value:null)}
                    
                } 
                defaultValue={d}
             />
        </search>
        </>)
}