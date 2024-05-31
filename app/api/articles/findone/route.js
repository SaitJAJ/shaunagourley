import {findAll, findOne, insertOne} from "@/lib/databaseFunctions";
import {NextResponse as Response} from "next/server";

export const runtime = 'edge'
export async function POST(req,res){
    let filer = await req.json()

    // console.log(req)
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

    let data = await findOne({
        collection:"test",
        filter:filer
    })
    console.log(data)
    // return new Response.json({status:400})
    // console.log(data)
    return new Response(JSON.stringify(data))
}