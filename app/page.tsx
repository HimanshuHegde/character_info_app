import Image from "next/image";
import "@/styles/home.css"
import { url } from "inspector";
import Search from '@/components/search'
import { Noto_Serif_JP } from "next/font/google";
const serif =Noto_Serif_JP({
  weight: '600',
  subsets: ['latin'],
})
export default function Home() {
  return (<>
    <div className="MainDiv">
      <Image className="backgroundImg1" src={"/874398.png"}
      width={1920}
      height={1080}
      alt="backgroundImage1"/>
      <h1 className={serif.className}>WELCOME TO THE WORLD OF MADE IN ABYSS</h1>
    </div>
    <div className="characterCardsHold">
      <Image className="backgroundImg2" src ={"/Map_of_the_Abyss_Anime.png"}
      width={1000}
      height={1547}
      alt="backgroundImage2"/>
     <Search/>
    </div>
    </>
  );
}
