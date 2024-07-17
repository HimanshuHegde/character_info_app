'use client'
import "@/styles/searchresult.css"
import { search } from "@/backend";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./card";
import Acards from "./Acard";
export default function SearchResult() {
  const param = useSearchParams();
  let flag = false;
  let [searchResult, setSearchResult] = useState<Array<any> | null>(null)
  useEffect(() => {
    (async () => {

      let temp = (await search(param?.get("name")?.toString()))
      setSearchResult(temp);
      console.log(param.get('name'))
    })()
  }, [param.get("name")])
  return (
    <div className="searchResultMD">
      {searchResult?.map((a: (any)) => {
        if (a.length > 0) {
          flag = true
          return (
            <>
              <p className="searchHeading">Results : </p>
              {a.map((x: any) => <a className="anchorS"href={`/${x.class}/?_id=${encodeURIComponent(x._id)}`}><Card image={x.image} name={x.name} /></a>)}
            </>
          )
        }
      })
      }
      {!flag &&
        <>
          <p className="searchHeading">No Result ! ! </p>
        </>
      }
    </div>
  )
}


