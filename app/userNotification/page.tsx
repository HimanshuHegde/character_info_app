"use client";
import { useSession } from "next-auth/react";
import { NotificationRetrieve } from "@/backend";
import { useEffect, useRef, useState } from "react";

export default function UserNotification() {
  let temp = useRef<HTMLDivElement>(null);
  let [notInfo, SetNotInfo] = useState<Record<string, string>[]>([]);
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  useEffect(() => {
    if (status == "authenticated"){
      (async () => {
        SetNotInfo(await NotificationRetrieve(email || ""));
      })();
     
    }
  }, [session]);
useEffect(()=>{
  if(temp.current){
    temp.current.scrollTop = temp.current.scrollHeight;
    // console.log(temp.current.scrollTop)
  }
},[notInfo])
  return (
    <div className="NotiContainer">
      <div className="NotiDiVHolder" ref={
        temp
      }>
        {notInfo.map((e) => {
          if (e.user == "1"){
            let splitInfoR = e.info.split(",");
            let parts = splitInfoR[1].split(':');
            let time = parts[0]+':'+parts[1]+' '+parts[2].split(' ')[1];
            return (
              <div className="rightNoti" key={e._id}>
                <p>{splitInfoR[0]}</p>
                <p className="Pr">{time}</p>
              </div>
            );
          }
          else if(e.user == "0"){
            let splitInfoL = e.info.split(",");
            let parts = splitInfoL[1].split(':');
            let time = parts[0]+':'+parts[1]+' '+parts[2].split(' ')[1];
          return(
            <div className="leftNoti" key={e._id}>
              <p>{splitInfoL[0]}</p>
              <p className="Pl">{time}</p>
            </div>
          )
        }
        })}
        <i className="scroll"></i>
      </div>
    </div>
  );
}
