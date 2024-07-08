import Image from "next/image"
import "@/styles/Acard.css"
export default function Acards({image,name}){

    return (
        <div className="cardContainer">
            <div className="cardImg">
                <Image className="displayInfo" src={image}
                width={300}
                height={300}
                alt={name}
                /> 
                {/* <img src={image} className="displayInfo"/> */}
            </div>
            <p className="cardName">{name}</p>
        </div>
    )
}