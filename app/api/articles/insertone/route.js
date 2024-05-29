import {findAll, findOne, insertOne} from "@/lib/databaseFunctions";
import {NextResponse as Response} from "next/server";

export const runtime = 'edge'
export async function POST(req,res){
    let document = await req.json()
    // await insertOne({
    //     collection:"test",
    //     document:{
    //         "category":"safety",
    //         "title":"This is another safety Article"
    //     }
    // })
    // await findOne({
    //     collection:"testone",
    //     filter:{
    //         category:"safety"
    //     }
    // })
    let data = await insertOne({
        collection:"test",
        document:document
    })
    console.log(data)
    return new Response(JSON.stringify(data))
    // return new Response()
}