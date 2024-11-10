'use client'
import Image from "next/image";
import "@/styles/home.css"
import Card from '@/components/card'
import Search from '@/components/search'
import { useSession } from "next-auth/react";
import { Noto_Serif_JP } from "next/font/google";
import { getArtifactsData, getCharacterData, getWhistleData, search } from "@/backend";

import { useEffect, useState } from "react";
import { useSearchParams,useRouter, usePathname } from "next/navigation";
import SearchResult from "@/components/searchResult";
const serif =Noto_Serif_JP({
  weight: '600',
  subsets: ['latin'],
})
export default  function Home(){
 
  const {data:session,status} = useSession();
  useEffect(()=>{
    console.log(session)
  },[session])
  const useParam = useSearchParams();
  useEffect(()=>{
    
    const filter = document.querySelector(".filters") as HTMLSelectElement|null;
    let whistleContainer = document.querySelector(".whistleInfoContainer") as HTMLElement|null;
    let charactersContainer = document.querySelector(".charactersInfoContainer") as HTMLElement|null;
    let artifactsContainer = document.querySelector(".artifactInfoContainer") as HTMLElement|null;
    filter?.addEventListener("change",(event)=>{
      let target = event.target as HTMLSelectElement;
      let value = target.value;
      switch(value){
        case "All":
          if(whistleContainer)
          whistleContainer.style.display="block";
          if(charactersContainer)
            charactersContainer.style.display="block";
          if(artifactsContainer)
            artifactsContainer.style.display="block"
          break;
        case "whistleInfoContainer":
          if(whistleContainer){
            whistleContainer.style.display="block";
            
          }
          if(charactersContainer){
            charactersContainer.style.display="none";
          
          }
          if(artifactsContainer){
            artifactsContainer.style.display="none"
          }
            break;
        case "charactersInfoContainer":
          if(whistleContainer)
            whistleContainer.style.display="none";
          if(charactersContainer)
            charactersContainer.style.display="block";
          if(artifactsContainer)
            artifactsContainer.style.display="none"
            break;
        case "artifactsInfoContainer":
          if(whistleContainer)
            whistleContainer.style.display="none";
            if(charactersContainer)
              charactersContainer.style.display="none";
            if(artifactsContainer)
              artifactsContainer.style.display="block"
            break;
      }
    })
  },[])
   const param = useSearchParams();
     
   
  let [data,setData] = useState<Array<any>|null>(null)
  useEffect(()=>{
      (async ()=>{
        const whistle =  getWhistleData();
        const character= getCharacterData();
        const artifacts = getArtifactsData();
        const temp = await Promise.all([
          whistle,character,artifacts
        ])
        setData(temp);
      })()
  },[])
  return (<>
    <div className="MainDiv">
      <Image className="backgroundImg1" src={"/874398.png"}
      width={1920}
      height={1080}
      alt="backgroundImage1"/>
      <h1 className={serif.className}>WELCOME TO THE WORLD OF MADE IN ABYSS</h1>
    </div>
    
    <div className="characterCardsHold">
     <Search d={useParam.get("name")?.toString()}/>
     <div className="container">
      <div className="categoryDiv">
        <label className="category"><p>Category : </p></label>
        <select className="filters" name="choose">
          <option value = "All">ALL</option>
          <option value = "whistleInfoContainer">Whistles</option>
          <option value= "charactersInfoContainer">Characters</option>
          <option value = "artifactsInfoContainer">Artifacts</option>
        </select>
      </div>
      <div className="whistleInfoContainer">
        <p className="heading">WHISTLES</p>
        <div className="whistleInfo">
          {
            data?.[0].map((e:(any))=>(<a key={e._id} className="anchorS" href={`/whisltes/?_id=${encodeURIComponent(e._id)}`}><Card image={e.image} name ={e.name}/></a>))
          }
      </div>
      </div> 
      <div className="charactersInfoContainer">
        <p className="heading">Characters</p>
        <div className="charactersInfo">
          {
            data?.[1].map((e:(any))=>(<a key={e._id} className="anchorS" href={`/characters/?_id=${encodeURIComponent(e._id)}`}>
              <Card image={e.image} name ={e.name}/>
            </a>))
          }
        </div>
      </div>
      <div className="artifactInfoContainer">
        <p className="heading">ARTIFACTS</p>
        <div className="artifactInfo">
          {
          data?.[2].map((e:(any))=>(<a key={e._id} className="anchorS" href={`/artifacts/?_id=${encodeURIComponent(e._id)}`}>
          <Card image={e.image} name ={e.name}/>
        </a>))
          }
        </div>
      </div>
      </div>
      {param.get("name")&&
      <SearchResult/>}
    </div>
    
    
    </>
  );
}
