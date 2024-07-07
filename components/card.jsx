import Image from "next/image"
import "@/styles/card.css"
export default function Card({image,name}){

    return (
        <div className="cardContainer">
            <div className="cardImg">
                <Image className="displayInfo" src={image}
                width={150}
                height={150}
                alt={name}
                />
            </div>
            <p className="cardName">{name}</p>
        </div>
    )
}