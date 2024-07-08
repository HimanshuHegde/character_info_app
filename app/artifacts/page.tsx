'use client'
import"@/styles/character.css"
import Search from "@/components/search";
import {  getIndividualArtifactsData,  } from "@/backend";
import Acards from "@/components/Acard"; 
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
export default  function Artifacts(){
    
    let [artifact,setartifact] = useState<any>({})
    const param = useSearchParams();
    useEffect(()=>{
        (async ()=>{
            const name = param.get("name")
            setartifact(await getIndividualArtifactsData(name));
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
                    <div className="characterSearchDiv">
                            <Search/>
                    </div>
                        
                    <div className="characterInfo">
                        <div className="characterCard">
                            <Acards image={artifact.image
                            } name={artifact.name}/> 
                        </div>
                            <h1>ARTIFACT DETAILS</h1>
                            <hr></hr>
                        <div className="cInfo">
                            <p><span>Name : </span>{artifact.name}</p>
                            <p><span>Type : </span>{artifact.Type}</p>
                            <p><span>Effects : </span>{artifact.Effects}</p>
                            <p><span>Owners : </span>{artifact.Owners}</p>
                            <p><span>Source : </span>{artifact.Source}</p>
                            <p><span>Description : </span>{artifact.Description}</p>
                        </div>
                    </div>
                    
                
                </div>
                
            </div>
        </>
    )
    

}