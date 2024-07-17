import InfoCard from "@/components/infoCard";
import { getUpdateData } from "@/backend";
import { useEffect } from "react";
import Link from "next/link";

export default async function Notification() {
   const data = await getUpdateData();
    return (
        <>

            {
                data.map((d:any)=>{
                    return <Link href={`/notification/${d._id + "&" + d.class}`}><InfoCard name={d.name} info={d.info}/></Link>
                })
            }
        </>
    )
}