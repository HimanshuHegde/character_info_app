'use client'
import"@/styles/character.css"
import Search from "@/components/search";
import {  getIndividualArtifactsData, getIndividualWhistlesData,  } from "@/backend";
import Acards from "@/components/Acard"; 
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
export default  function Whistles(){
    
    let [whistle,setWhistle] = useState<any>({})
    const param = useSearchParams();
    useEffect(()=>{
        (async ()=>{
            const name = param.get("name")
            setWhistle(await getIndividualWhistlesData(name));
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
                            <Acards image={whistle.image
                            } name={whistle.name}/> 
                        </div>
                            <h1>WHISTLE DETAILS</h1>
                            <hr></hr>
                        <div className="cInfo">
                            <p><span>Name : </span>{whistle.name}</p>
                            <p><span>Qualification : </span>{whistle.qualification}</p>
                            <p><span>Description : </span>{whistle.description}</p>
                        </div>
                    </div>
                    
                
                </div>
                
            </div>
        </>
    )
    

}