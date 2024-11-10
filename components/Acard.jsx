import Image from "next/image"
import "@/styles/Acard.css"
export default function Acards({image,name}){

    return (
        <div className="cardContainer">
            <div className="cardImg">
                <Image className="displayInfo" src={image||'/noImage.jpg'}
                width={300}
                height={300}
                alt={name || 'no image available'}
                priority
                /> 
                {/* <img src={image} className="displayInfo"/> */}
            </div>
            <p className="cardName">{name}</p>
        </div>
    )
}