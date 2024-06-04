import {findAll, findOne, insertOne} from "@/lib/databaseFunctions";
import {NextResponse as Response} from "next/server";

export const runtime = 'edge'
export async function POST(req,res){
    let filter = await req.json()

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

    let data = await findAll({
        collection:"images",
        filter:filter
    })
    // return new Response.json({status:400})
    return new Response(JSON.stringify(data))
}