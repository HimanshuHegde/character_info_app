'use client'
import"@/styles/character.css"
import Search from "@/components/search";
import { getCharacterData, getIndividualCharacterData } from "@/backend";
import Acards from "@/components/Acard"; 
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchResult from "@/components/searchResult";
export default  function Character(){
    
    let [character,setCharacter] = useState<any>({})
    const uesParam = useSearchParams();
    useEffect(()=>{
        (async ()=>{
            const id = uesParam.get("_id")
            setCharacter(await getIndividualCharacterData(id?id:""));
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
                {uesParam.get("name")?<SearchResult/>:null} 
                    <div className="characterSearchDiv">
                            <Search d={uesParam.get("name")?.toString()}/>
                    </div>
                        
                    <div className="characterInfo">
                        <div className="characterCard">
                            <Acards image={character?.actualPhoto
                            } name={character?.name}/> 
                        </div>
                            <h1>CHARACTER DETAILS</h1>
                            <hr></hr>
                        <div className="cInfo">
                            <p><span>Name : </span>{character?.name}</p>
                            <p><span>Age : </span>{character?.age}</p>
                            <p><span>Description : </span>{character?.description}</p>
                        </div>
                    </div>
                    
                
                </div>
                
            </div>
        </>
    )
    

}