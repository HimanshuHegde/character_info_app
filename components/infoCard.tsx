export default function InfoCard({name,info}:{name:string,info:string}){
    return (
        <div className="infoCard">
            <h1 className="infoName">{name}</h1>   
            <p className="infoInfo">{info}</p>
        </div>
    )
}