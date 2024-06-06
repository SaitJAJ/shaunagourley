import {getJwtData, setJwt} from "@/lib/serverFunctions/JWTutils";
import {NextResponse as Response} from "next/server";
import {cookies} from "next/headers";
export const runtime = 'edge';
export async function GET(res) {
    let cookie = cookies().get('jwtoken')
    let val = await getJwtData(cookie)
    return new Response(JSON.stringify(val))
}
export async function POST(res,req){
    await setJwt(await res.json())
    return new Response(JSON.stringify({success:true}))
}