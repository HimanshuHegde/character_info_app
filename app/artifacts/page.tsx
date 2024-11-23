'use client'
import"@/styles/character.css"
import Search from "@/components/search";
import {  getIndividualArtifactsData,  } from "@/backend";
import Acards from "@/components/Acard"; 
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { useSearchParams,useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import SearchResult from "@/components/searchResult";

export default  function Artifacts(){
    
    let [artifact,setartifact] = useState<any>({})
    const useParam = useSearchParams();
    
    useEffect(()=>{
        (async ()=>{
            const id = useParam.get("_id")
            setartifact(await getIndividualArtifactsData(id?id:undefined));
        })()
    },[])
    
    return(
        <> 
            <div className="mainMainDiv">
                <Image className="characterBackground"src={"/background1.png"} 
                width={3360}
                height={1728}
                alt="background"
                />
                <div className="charactersMainDiv">
                {useParam.get("name")?<SearchResult/>:null} 
                    {/* <div className="characterSearchDiv">
                            <Search d = {useParam.get("name")?.toString()}/>
                    </div> */}
                    
                        
                    <div className="characterInfo">
                        <div className="characterCard">
                            <Acards image={artifact?.image
                            } name={artifact?.name}/> 
                        </div>
                            <h1>ARTIFACT DETAILS</h1>
                            <hr></hr>
                        <div className="cInfo">
                            <p><span>Name : </span>{artifact?.name}</p>
                            <p><span>Type : </span>{artifact?.Type}</p>
                            <p><span>Effects : </span>{artifact?.Effects}</p>
                            <p><span>Owners : </span>{artifact?.Owners}</p>
                            <p><span>Source : </span>{artifact?.Source}</p>
                            <p><span>Description : </span>{artifact?.Description}</p>
                        </div>
                    </div>
                    
                
                </div>
                
            </div>
        </>
    )
    

}