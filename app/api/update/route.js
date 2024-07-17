
import {search, update} from "@/backend"
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    search
   let status = await  update(body);
    return NextResponse.json(status)
}