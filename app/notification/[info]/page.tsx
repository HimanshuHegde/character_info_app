import { getIndividualUpdateData } from "@/backend";
import Acards from "@/components/Acard";
export default async function DetailedInfo({params:{info}}:{params:{info:string}}){
    const data = await getIndividualUpdateData(info.split("%26")[0]);
    const type = info.split("%26")[1];
    if(type=='Characters'){
        return <div className="characterInfo">
        <div className="characterCard">
            <Acards image={data?.actualPhoto
            } name={data?.name}/> 
        </div>
            <h1>CHARACTER DETAILS</h1>
            <hr></hr>
        <div className="cInfo">
            <p><span>Name : </span>{data?.name}</p>
            <p><span>Age : </span>{data?.age}</p>
            <p><span>Description : </span>{data?.description}</p>
        </div>
    </div>
    }
    else if(type=='Artifacts'){
        return <div className="characterInfo">
        <div className="characterCard">
            <Acards image={data?.actualPhoto
            } name={data?.name}/> 
        </div>
            <h1>ARTIFACT DETAILS</h1>
            <hr></hr>
        <div className="cInfo">
            <p><span>Name : </span>{data?.name}</p>
            <p><span>Age : </span>{data?.age}</p>
            <p><span>Description : </span>{data?.description}</p>
        </div>
    </div>
    }
    else if(type=='Whistles'){
        return <div className="characterInfo">
        <div className="characterCard">
            <Acards image={data?.actualPhoto
            } name={data?.name}/> 
        </div>
            <h1>WHISTLE DETAILS</h1>
            <hr></hr>
        <div className="cInfo">
            <p><span>Name : </span>{data?.name}</p>
            <p><span>Age : </span>{data?.age}</p>
            <p><span>Description : </span>{data?.description}</p>
        </div>
    </div>
    }
}