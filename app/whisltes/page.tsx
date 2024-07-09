'use client'
import"@/styles/character.css"
import Search from "@/components/search";
import {  getIndividualArtifactsData, getIndividualWhistlesData,  } from "@/backend";
import Acards from "@/components/Acard"; 
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchResult from "@/components/searchResult";
export default  function Whistles(){
    
    let [whistle,setWhistle] = useState<any>({})
    const useParam = useSearchParams();
    useEffect(()=>{
        (async ()=>{
            const id = useParam.get("_id")
            setWhistle(await getIndividualWhistlesData(id?id:""));
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
                    <div className="characterSearchDiv">
                            <Search d ={useParam.get("name")?.toString()}/>
                    </div>
                        
                    <div className="characterInfo">
                        <div className="characterCard">
                            <Acards image={whistle?.image
                            } name={whistle?.name}/> 
                        </div>
                            <h1>WHISTLE DETAILS</h1>
                            <hr></hr>
                        <div className="cInfo">
                            <p><span>Name : </span>{whistle?.name}</p>
                            <p><span>Qualification : </span>{whistle?.qualification}</p>
                            <p><span>Description : </span>{whistle?.description}</p>
                        </div>
                    </div>
                    
                
                </div>
                
            </div>
        </>
    )
    

}