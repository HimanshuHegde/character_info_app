import Image from "next/image"
import "@/styles/card.css"
export default function Card({object}){

    return (
        <div className="cardContainer">
            <div className="cardImg">
                <Image className="displayInfo" src={object.image}
                width={150}
                height={150}
                alt="whistles image"
                />
            </div>
            <p className="cardName">{object.name}</p>
        </div>
    )
}