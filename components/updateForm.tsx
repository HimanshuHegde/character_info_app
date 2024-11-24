'use client'
import { useEffect, useState } from "react"
import '@/styles/update.css'
import { insert, NotificationUpdate, search } from "@/backend"
import { useSession } from "next-auth/react"
export default function UpdateF(){
    const [currentDateTime,SetCurrentDateTime] = useState<string>('');
    useEffect(()=>{
        const now = new Date();
        SetCurrentDateTime(now.toLocaleString())
    },[])
    let [success,setSuccess] = useState<boolean|null>(null)
    let {data:session} = useSession();
    let [info,setInfo] = useState<any|''>({})
    let [type,setType] = useState<string>('whistles')
    let [name,setName] = useState<string|undefined>('')
    useEffect(() => {
        if (success !== null) {
          const confirmation = document.getElementById('confirmation') as HTMLElement | null;
          if (confirmation) confirmation.style.display = 'block';
    
          const timer = setTimeout(() => {
            if (confirmation) confirmation.style.display = 'none';
            setSuccess(null); 
          }, 2000);
    
        }
      }, [success]);
    useEffect(()=>{
        (async()=>{
            let index = 0;
            if(type=='characters'){
                index = 0;
            }else if(type=='artifacts'){
                index = 1
               
            }else{
                index = 2
                
            }
            if(name){
            const result = await search(name);
            const [a] = result[index]
            if(!a){
                setInfo(name)
            // console.log(name)
            }else
            setInfo(a)
            }
            
        })()

    },[name,type])
    // useEffect(()=>{
    //     console.log(info)
    // },[info])


    // function pr(e:any){
    //     console.log(e);
    // }
    return(<>
        <div className="updateFContainer">
        <button className="closeForm" onClick={
            ()=>{
                document.querySelector('.updateFContainer')?.classList.remove('active');
            }
        }>
        <p>CLOSE</p>
        </button>
        
            <form className="uForm" onSubmit={
                async (e)=>{
                    e.preventDefault();
                    
                    let data = Object.fromEntries(new FormData(e.currentTarget).entries());
                    data = {...data,name:info?.name||name}
                    data.email = session?.user?.email||"";
                    if(data.name){
                        
                        let str = (data.class).toString();
                        if(session?.user?.name=='admin'){
                            // pr(data);
                            insert(str,data)
                            return 'done'
                        }
                        let result = await fetch('/api/update',{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(data)
                        })
                       
                        if(result.status==200){
                            
                            setSuccess(true);
                            
                            (async ()=>{
                               
                                  await  NotificationUpdate(1,'The form on '+data.name+' is submitted successfully on '+currentDateTime,session?.user?.email||'')
                            })()
                        }else{
                            setSuccess(false)
                        }

                        
                    }
                   
                }
            }>
                <select name="class"   key={info?._id + "class"} onChange={
                    (e)=>{
                        setType(e.target.value);
                    }
                } value={type}>    
                    <option value="whistles">whistle</option>
                    <option value="characters">characters</option>
                    <option value="artifacts">artifacts</option>
                </select>
                <label htmlFor="name">name</label>
                <input required = {true} id="name" type="text" name="name"  onChange={
                    (e)=>{
                        setName(e.target.value);
                    }
                } value={name}/>
                {type=="whistles"&&<>
                <label htmlFor="qualification">qualification</label>
                <input required = {true} id="qualification" type="text" name="qualification"  defaultValue={info?.qualification}  key={info?._id + "qualification"}></input>
                <label htmlFor="image">image</label>
                <input required = {true} id="image" type="text" name="image"  defaultValue={info?.image}  key={info?._id + "image"}></input>
                <label htmlFor="description">Discription</label>
                <textarea required = {true} id="description"  name="description"  defaultValue={info?.description}  key={info?._id + "description"} />
                </>
                 || 
                type=='characters'&&<>
                <label htmlFor="age">age</label>
                <input required = {true} id="age" type="text" name="age"  defaultValue={info?.age}  key={info?._id + "age"}/>
                <label htmlFor="actualPhoto">actual photo</label>
                <input required = {true} id="actualPhoto" type="text" name="actualPhoto"  defaultValue={info?.actualPhoto}  key={info?._id + "actualPhoto"}/>
                <label htmlFor="image">image</label>
                <input required = {true} id="image" type="text" name="image"  defaultValue={info?.image}  key={info?._id + "image"}/>
                <label htmlFor="description">description</label>
                <textarea required = {true} id="description"  name="description"  defaultValue={info?.description}  key={info?._id + "description"}/>
                </>
                ||
                type=='artifacts'&&
                <>
               
                 <label htmlFor="type">type</label>
                 <input required = {true} id="type" type="text" name="type"  defaultValue={info?.Type}  key={info?._id + "type"}/>
                 <label htmlFor="Source">Source</label>
                 <input required = {true} id="Source" type="text" name="Source"  defaultValue={info?.Source}  key={info?._id + "Source"}/>
                 <label htmlFor="image">image</label>
                 <input required = {true} id="image" type="text" name="image" defaultValue={info?.image} key={info?._id + "image"}/>
                 <label htmlFor="Effects">Effects</label>
                 <input required = {true} id="Effects" type="text" name="Effects"  defaultValue={info?.Effects}  key={info?._id + "Effects"}/>
                 <label htmlFor="Description">Description</label>
                 <textarea required = {true} id="Description" name="Description"  defaultValue={info?.Description}  key={info?._id + "Description"}/>
                </>}
                <button type="submit">Submit</button>
            {success?<p style={{color:"#0dff0d"}} id="confirmation">update successful</p>:success==false&&<p style={{color:"red"}} id="confirmation">update failed</p>}
            </form>
        </div>
    </>)
}

