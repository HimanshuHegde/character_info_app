"use client";
import { getUpdateData } from "@/backend";
import { useEffect, useState } from "react";
import "@/styles/noti.css";
import Link from "next/link";
import { Cards } from "@/components/card";
import Acards from "@/components/Acard";

export default function Notification() {

  let [data, setData] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    (async () => {
      setData(await getUpdateData());
    })();
  }, []);

  return (
    <>
      <div className="notiContainer">
        {data?.map((d:Record<string, any>) => {
          return (
            <Link
            key={d._id}
              className="notiCardL"
              href={`/notification/${d._id + "&" + d.class}`}
            >
              <Cards image={d.image} name={d.name} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
