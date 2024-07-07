'use client'
import "@/styles/searchresult.css"
import { search } from "@/backend";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./card";
export default function SearchResult(){
    const param = useSearchParams();
    let [searchResult,setSearchResult] = useState<Array<any>|null>(null) 
    useEffect(()=>{
      (async ()=>{
        
        let temp = ( await search(param?.get("name")?.toString()))
        setSearchResult(temp);
        console.log(param.get('name'))
      })()
    },[param.get("name")])
    return (
        <div className="searchResultMD">
            <p className="searchHeading">Results : </p>
       {searchResult?.map((e)=>e.map((x:any)=><Card image={x.image} name={x.name}/>))}
    </div>
    )
}


