"use client";
import "@/styles/sidebar.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UpdateF from "./updateForm";
export default function Sidebar() {
  let { data: session } = useSession();
  


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
          ?
          <button
            className="edit"
            onClick={() => {
              let uf = document.querySelector(".updateFContainer");
              uf?.classList.add("active");
              document.querySelector(".sidebar")?.classList.remove("active");
            }}
          >
            Edit
          </button>
          <button></button>
          <button></button>
        </div>
      </div>
      <UpdateF />
    </>
  );
}
