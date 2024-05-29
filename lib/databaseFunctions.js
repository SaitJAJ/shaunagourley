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
    return(await res.json())
}
export async function findOne(query){
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
    console.log(await res.json())
}
export async function insertOne(query){
    console.log(query.document)
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
    console.log(await res.json())
}