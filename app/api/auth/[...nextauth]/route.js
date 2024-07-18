import { logIn } from "@/backend";
import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Google from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { debug } from "console";


const prisma = new PrismaClient()
const authOptions = {
  adapter:PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [

    Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials,req) {
            if(!credentials.email||!credentials.password){
              return null
            }
            const user = await prisma.userInfo.findUnique({
              where:{
                email:credentials.email
              }
            })
            
        if(!user){
          return null
        }
        const password = await bcrypt.compare(credentials.password,user.hashedPassword)
        if(!password){
          return null
        }
        return user
      },
    }),
  ],
  session : {
    strategy : "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }