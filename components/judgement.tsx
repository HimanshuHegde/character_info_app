'use client'
import { Delete, insert } from "@/backend"
import { useRouter} from "next/navigation"
import { useEffect, useState } from "react"
export function JudgmentA({collection,data}:{collection:string,data:any}){
    let [flag,setFlag] = useState<boolean>(false)
    const router= useRouter()
    useEffect(()=>{
        if(flag)router.push('/notification')
    },[router,flag])
    return <button className="accept" onClick={
        async ()=>{
            await insert(collection,data) 
            await Delete(data)
            setFlag(true)
        }
    }>ACCEPT</button>
}

export function JudgmentD({data}:{data:any}){
    let [flag,setFlag] = useState<boolean>(false)
    const router = useRouter()
    useEffect(()=>{
        if(flag)router.push('/notification')
    },[router,flag])

    return <button className="decline" onClick={
        async()=>{
            await Delete(data)
            setFlag(true)
        }
    }>DECLINE</button>

}