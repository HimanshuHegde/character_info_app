import Image from "next/image"
import "@/styles/card.css"
import { useSearchParams } from "next/navigation"
export default function Card({image,name}){
    let useParam = useSearchParams();

    return (
        <div className="cardContainer">
            <div className="cardImg">
                
                    
                    <Image className={useParam.get("_id")?"displayInfo":""} src={image}
                    width={150}
                    height={150}
                    alt={name}
                    />
                
                
            </div>
            <p className="cardName">{name}</p>
        </div>
    )
}

export function Cards({image,name}){

    return (
        <div className="cardContainer">
            <div className="cardImg">
                
                    
                    <Image className={"displayInfo"} src={image}
                    width={100}
                    height={100}
                    alt={name}
                    />
                
                
            </div>
            <p className="cardName">{name}</p>
        </div>
    )
}