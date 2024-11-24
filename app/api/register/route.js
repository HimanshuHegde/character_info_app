import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const {name,email,password} = body;
    // console.log(body.data)
    if(!name||!email || !password)
        return new NextResponse("Missing email,password",{status:400})
    const exists = await prisma.userInfo.findFirst({
        where:{
            OR:[
                {email},
                {name}
            ]
        }
    })
    if(exists)
        return new NextResponse("User already exists",{status:400})
    
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await prisma.userInfo.create({
        data:{
            name,
            email,
            hashedPassword
        }
    })
    return NextResponse.json(user)
}