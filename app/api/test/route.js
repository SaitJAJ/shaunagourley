import {getJwtData, setJwt} from "@/lib/serverFunctions/JWTutils";
import {NextResponse as Response} from "next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
export const runtime = 'edge';
export async function GET(res) {
    // let cookie = cookies().get('jwtoken')
    // let val = await getJwtData(cookie)
    // console.log(val)
    redirect("/articles/")
    // return new Response(JSON.stringify({val: "val"}))
}
export async function POST(res,req){
    await setJwt(await res.json())
    return new Response(JSON.stringify({success:true}))
}