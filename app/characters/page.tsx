'use client'
import"@/styles/character.css"
import Search from "@/components/search";
import { getCharacterData, getIndividualCharacterData } from "@/backend";
import Card from "@/components/card"; 
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
                
                <div className="charactersMainDiv">
                     <div className="characterSearchDiv">
                        <Search/>
                    </div>
                    
                    <Card image={character.image
                    } name={character.name}/> 
                <div>
            </div>

            </div>
                
            </div>
        </>
    )
    

}