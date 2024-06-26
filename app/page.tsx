import Image from "next/image";
import "@/styles/home.css"
import { url } from "inspector";


export default function Home() {
  return (
    <div className="MainDiv">
      <Image className="backgroundImg" src={"/874398.png"}
      width={1920}
      height={1080}
      alt="background image"/>
      <h1>WELCOME TO THE WORLD OF MADE IN ABYSS</h1>
    </div>
  );
}
