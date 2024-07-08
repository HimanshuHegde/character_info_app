'use client'
import"@/styles/character.css"
import Search from "@/components/search";
import { getCharacterData, getIndividualCharacterData } from "@/backend";
import Acards from "@/components/Acard"; 
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
export default  function Character(){
    
    let [character,setCharacter] = useState<any>({})
    const param = useSearchParams();
    useEffect(()=>{
        (async ()=>{
            const name = param.get("name")
            setCharacter(await getIndividualCharacterData(name));
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
                            <Acards image={character.actualPhoto
                            } name={character.name}/> 
                        </div>
                            <h1>CHARACTER DETAILS</h1>
                            <hr></hr>
                        <div className="cInfo">
                            <p><span>Name : </span>{character.name}</p>
                            <p><span>Age : </span>{character.age}</p>
                            <p><span>Description : </span>{character.description}</p>
                        </div>
                    </div>
                    
                
                </div>
                
            </div>
        </>
    )
    

}