'use client'
import { useEffect, useState } from "react"
import '@/styles/update.css'
import { search } from "@/backend"
export default function UpdateF(){
    let [info,setInfo] = useState<any|null>({})
    let [type,setType] = useState<string>('Whistles')
    let [name,setName] = useState<string|undefined>('')
    useEffect(()=>{
        (async()=>{
            let index = 0;
            if(type=='Characters'){
                index = 0;
            }else if(type=='Artifacts'){
                index = 1
               
            }else{
                index = 2
                
            }
            if(name){
            const result = await search(name);
            const [a] = result[index] 
            setInfo(a)
            console.log(a)
            }
            
        })()

    },[name,type])
    useEffect(()=>{
        console.log(info)
    },[info])


    function pr(e:any){
        console.log(JSON.stringify(e));
    }
    return(<>
        <div className="updateFContainer">
            <form className="uForm" onSubmit={
                async (e)=>{
                    e.preventDefault();
                    let data = Object.fromEntries(new FormData(e.currentTarget).entries());
                    data = {...data,name:info?.name}
                    if(data.name){
                        pr(data);
                        let result = await fetch('/api/update',{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(data)
                        })
                    }
                }
            }>
                <select name="class"   key={info?._id + "class"} onChange={
                    (e)=>{
                        setType(e.target.value);
                    }
                } value={type}>    
                    <option value="Whistles">whistle</option>
                    <option value="Characters">characters</option>
                    <option value="Artifacts">artifacts</option>
                </select>
                <label htmlFor="name">name</label>
                <input id="name" type="text" name="name"  onChange={
                    (e)=>{
                        setName(e.target.value);
                    }
                } value={name}/>
                {type=="Whistles"&&<>
                <label htmlFor="qualification">qualification</label>
                <input id="qualification" type="text" name="qualification"  defaultValue={info?.qualification}  key={info?._id + "qualification"}></input>
                <label htmlFor="image">image</label>
                <input id="image" type="text" name="image"  defaultValue={info?.image}  key={info?._id + "image"}></input>
                <label htmlFor="description">Discription</label>
                <textarea id="description"  name="description"  defaultValue={info?.description}  key={info?._id + "description"} />
                </>
                 || 
                type=='Characters'&&<>
                <label htmlFor="age">age</label>
                <input id="age" type="text" name="age"  defaultValue={info?.age}  key={info?._id + "age"}/>
                <label htmlFor="actualPhoto">actual photo</label>
                <input id="actualPhoto" type="text" name="actualPhoto"  defaultValue={info?.actualPhoto}  key={info?._id + "actualPhoto"}/>
                <label htmlFor="image">image</label>
                <input id="image" type="text" name="image"  defaultValue={info?.image}  key={info?._id + "image"}/>
                <label htmlFor="description">description</label>
                <textarea id="description"  name="description"  defaultValue={info?.description}  key={info?._id + "description"}/>
                </>
                ||
                type=='Artifacts'&&
                <>
               
                 <label htmlFor="type">type</label>
                 <input id="type" type="text" name="type"  defaultValue={info?.Type}  key={info?._id + "type"}/>
                 <label htmlFor="Source">Source</label>
                 <input id="Source" type="text" name="Source"  defaultValue={info?.Source}  key={info?._id + "Source"}/>
                 <label htmlFor="image">image</label>
                 <input id="image" type="text" name="image3" defaultValue={info?.image} key={info?._id + "image"}/>
                 <label htmlFor="Effects">Effects</label>
                 <input id="Effects" type="text" name="Effects"  defaultValue={info?.Effects}  key={info?._id + "Effects"}/>
                 <label htmlFor="Description">Description</label>
                 <textarea id="Description" name="Description"  defaultValue={info?.Description}  key={info?._id + "Description"}/>
                </>}
                <button type="submit">Submit</button>
            </form>
        </div>
    </>)
}