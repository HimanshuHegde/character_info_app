"use client";
import { useSession } from "next-auth/react";
import { NotificationRetrieve } from "@/backend";
import { useEffect, useState } from "react";
import { stat } from "fs";

export default function UserNotification() {
  let [notInfo, SetNotInfo] = useState<Record<string, string>[]>([]);
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  useEffect(() => {
    if (status == "authenticated")
      (async () => {
        SetNotInfo(await NotificationRetrieve(email || ""));
      })();
  }, [session]);

  return (
    <>
      <div>

        {notInfo.map((e) => {
          if (e.user == "1")
            return (
              <div className="rightNoti">
                <p>{e.info}</p>
              </div>
            );
          else if(e.user == "0")
          return(
            <div className="leftNoti">
              <p>{e.info}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
