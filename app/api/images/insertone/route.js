import {findAll, findOne, insertOne} from "@/lib/databaseFunctions";
import {NextResponse as Response} from "next/server";

export const runtime = 'edge'
export async function POST(req,res){
    let formData =await req.formData()

    let file = formData.get("file");
    let buffer = Buffer.from(await file.arrayBuffer())

    let document = {
        panelId:formData.get('panelId'),
        imagePosition:formData.get('imagePosition'),
        srcBuffer:buffer,
        srcAlt:formData.get("alt")||"Image ALT"
    }
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
        collection:"images",
        document:document
    })
    return new Response(JSON.stringify(data))
    // return new Response(JSON.stringify("da"))
}