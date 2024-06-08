import { getRequestContext } from '@cloudflare/next-on-pages'

export function getEnvVal(valList){
    let envList = []
    if( process.env.MONGODB_URI !== undefined){
        envList = Object.values(valList).map(value => {
            return(process.env[value])
        })
    }else{
        const myKv = getRequestContext().env.MY_KV
        console.log(myKv)
        console.log(getRequestContext().env["MONGODB_URI"])
        console.log(myKv.get("MONGODB_URI"))
        envList = Object.values(valList).map(value => {
            return(mykv.get(value))
        })
        console.log(envList)
    }
    return envList

}
export async function findAll(query){
    let [uri, apiKey] = getEnvVal(["MONGODB_URI", "MONGODB_DATA_API_KEY"])
    let res = await fetch(uri+"/action/find",{
        method:'POST',
        headers:{
            'apiKey':apiKey,
            'Content-Type':"application/json",
            'Accept':'application/json',
        },
        body:JSON.stringify({
            "dataSource": "mongodb-atlas",
            "database": "cloudflare",
            "collection":query.collection,
            "filter":query.filter
        })
    })
    console.log(res)
    return(await res.json())
}
export async function findOne(query){
    let [uri, apiKey] = getEnvVal(["MONGODB_URI", "MONGODB_DATA_API_KEY"])
    console.log(query.filter)
    let res = await fetch(uri+"/action/findOne",{
        method:'POST',
        headers:{
            'apiKey':apiKey,
            'Content-Type':"application/json",
            'Accept':'application/json',
        },
        body:JSON.stringify({
            "dataSource": "mongodb-atlas",
            "database": "cloudflare",
            "collection":query.collection,
            "filter":{}
        })
    })
    return (await res.json())
}
export async function insertOne(query){
    let [uri, apiKey] = getEnvVal(["MONGODB_URI", "MONGODB_DATA_API_KEY"])
    let res = await fetch(uri+"/action/insertOne",{
        method:'POST',
        headers:{
            'apiKey':apiKey,
            'Content-Type':"application/json",
            'Accept':'application/json',
        },
        body:JSON.stringify({
            "dataSource": "mongodb-atlas",
            "database": "cloudflare",
            "collection":query.collection,
            "document":query.document
        })
    })
    return(await res.json())
}
export async function updateOne(query){
    let [uri, apiKey] = getEnvVal(["MONGODB_URI", "MONGODB_DATA_API_KEY"])
    let res = await fetch(uri+"/action/updateOne",{
        method:'POST',
        headers:{
            'apiKey':apiKey,
            'Content-Type':"application/json",
            'Accept':'application/json',
        },
        body:JSON.stringify({
            "dataSource": "mongodb-atlas",
            "database": "cloudflare",
            "collection":query.collection,
            "filter":query.filter,
            "update":query.update,
            "upsert":query.upsert,
        })
    })
    return(await res.json())
}