"use client";
import "@/styles/sidebar.css";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UpdateF from "./updateForm";
import { useParams, useRouter } from "next/navigation";
export default function Sidebar() {
  let { data: session } = useSession();
let router = useRouter();


  return (
    <>
      <div className="sidebar">
        <button
          className="close"
          onClick={() => {
            document.querySelector(".sidebar")?.classList.remove("active");
          }}
        >
          <i className="uil uil-multiply"></i>
        </button>
        <div className="sidebarContent">
          <div className="sidebaruser">
            <p>
              Hi, <span>{session?.user?.name}</span>
            </p>
          </div>
          <button
            className="sidebaredit sidebarbtn"
            onClick={() => {
              let uf = document.querySelector(".updateFContainer");
              uf?.classList.add("active");
              document.querySelector(".sidebar")?.classList.remove("active");
            }}
          >
            Edit
          </button>
          {session?.user?.name!="admin"?
           <a
           href="/userNotification">
            <button className="sidebarnoti sidebarbtn">notification</button>
            </a>:
             <a
             href="/notification">
              <button className="sidebarnoti sidebarbtn">notification</button>
             </a>}
          <button className="sidebarlogout sidebarbtn" onClick={
            ()=>{
                router.push('/')
                signOut({callbackUrl:"/"});
              
              
            }
          }>
            Logout
          </button>
        </div>
      </div>
      <UpdateF />
    </>
  );
}
