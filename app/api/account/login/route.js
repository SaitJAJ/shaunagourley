import {NextResponse as Response} from "next/server";
import {setJwt} from "@/lib/serverFunctions/JWTutils";
export const runtime = 'edge'

export async function POST(res, req) {
    let formData = await res.formData()
    console.log(formData)
    let email = formData.get('email')
    let password = formData.get('password')
    await setJwt({email: email})

    return new Response();
}