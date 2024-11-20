'use client'
import { Delete, insert, NotificationUpdate } from "@/backend"
import { useSession } from "next-auth/react"
import { useRouter} from "next/navigation"
import { useEffect, useState } from "react"
export function JudgmentA({collection,data}:{collection:string,data:any}){
    const [currentDateTime,SetCurrentDateTime] = useState<string>('');
    useEffect(()=>{
        const now = new Date();
        SetCurrentDateTime(now.toLocaleString())
    },[])
    let [flag,setFlag] = useState<boolean>(false)
    const router= useRouter()
    useEffect(()=>{
        if(flag)router.push('/notification')
    },[router,flag])
    return <button className="accept" onClick={
        async ()=>{
            await insert(collection,data) 
            await Delete(data)
            await NotificationUpdate(0,"The form on "+data.name+" has been accepted by the admin on "+currentDateTime,data.email)
            setFlag(true)
        }
    }>ACCEPT</button>
}

export function JudgmentD({data}:{data:any}){
    const [currentDateTime,SetCurrentDateTime] = useState<string>('');
    useEffect(()=>{
        const now = new Date();
        SetCurrentDateTime(now.toLocaleString())
    },[])
    let [flag,setFlag] = useState<boolean>(false)
    const router = useRouter()
    useEffect(()=>{
        if(flag)router.push('/notification')
    },[router,flag])

    return <button className="decline" onClick={
        async()=>{
            await Delete(data)
            await NotificationUpdate(0,"The form on "+data.name+" has been rejected by the admin on "+currentDateTime,data.email)
            setFlag(true)
        }
    }>DECLINE</button>

}