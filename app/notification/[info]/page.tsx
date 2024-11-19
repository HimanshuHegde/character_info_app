import { getIndividualUpdateData } from "@/backend";
import Acards from "@/components/Acard";
import { JudgmentA, JudgmentD } from "@/components/judgement";
import"@/styles/character.css"
import Image from "next/image";
export default async function DetailedInfo({params}:{params:Promise<{info:string}>}) {
    console.log(params);
    const {info}  = await params
    const data = await getIndividualUpdateData(info.split("%26")[0]);
    const type = info.split("%26")[1];
    if(type=='characters'){
        return   <>
        <div className="mainMainDiv">
        <Image className="characterBackground"src={"/background1.png"} 
        width={3360}
        height={1728}
        alt="background"
        />
        <div className="charactersMainDiv">
            <div className="characterInfo">
                <div className="acceptDecline">
                <JudgmentA collection="characters" data={data}/>
                <JudgmentD  data ={data}/>
                </div>
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
            
        
        </div>
        
    </div>
</>
    }
    else if(type=='artifacts'){
        return <> 
        <div className="mainMainDiv">
            <Image className="characterBackground"src={"/background1.png"} 
            width={3360}
            height={1728}
            alt="background"
            />
            <div className="charactersMainDiv">
                <div className="characterInfo">
                <div className="acceptDecline">
                <JudgmentA collection="artifacts" data ={data}/>
                <JudgmentD  data ={data}/>
                </div>
                    <div className="characterCard">
                        <Acards image={data?.image
                        } name={data?.name}/> 
                    </div>
                        <h1>ARTIFACT DETAILS</h1>
                        <hr></hr>
                    <div className="cInfo">
                        <p><span>Name : </span>{data?.name}</p>
                        <p><span>Type : </span>{data?.Type}</p>
                        <p><span>Effects : </span>{data?.Effects}</p>
                        <p><span>Owners : </span>{data?.Owners}</p>
                        <p><span>Source : </span>{data?.Source}</p>
                        <p><span>Description : </span>{data?.Description}</p>
                    </div>
                </div>
                
            
            </div>
            
        </div>
    </>
    }
    else if(type=='whistles'){
        return <> 
        <div className="mainMainDiv">
            <Image className="characterBackground"src={"/background1.png"} 
            width={3360}
            height={1728}
            alt="background"
            />
            <div className="charactersMainDiv">
                <div className="characterInfo">
                <div className="acceptDecline">
                <JudgmentA collection="whistles" data ={data}/>
                <JudgmentD data ={data}/>
                </div>
                    <div className="characterCard">
                        <Acards image={data?.image
                        } name={data?.name}/> 
                    </div>
                        <h1>WHISTLE DETAILS</h1>
                        <hr></hr>
                    <div className="cInfo">
                        <p><span>Name : </span>{data?.name}</p>
                        <p><span>Qualification : </span>{data?.qualification}</p>
                        <p><span>Description : </span>{data?.description}</p>
                    </div>
                </div>
                
            
            </div>
            
        </div>
    </>
    }
}