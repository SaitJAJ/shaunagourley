'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Dev(){
    const [stateVal,setStateVal] = useState("Default Val")
    const [output,setOutput] = useState("")
    const setJwt=async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/test",{
            method:"POST",
            body:JSON.stringify({data:stateVal})
        })
    }
    const router = useRouter();
    const getJwt=async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/test")
        if(res.redirected){
            router.push(res.url)
        }
        let data = (await res.json())
        setOutput(JSON.stringify(data))
    }

    return(
        <>
            <input type={'text'} className={'w-60'} value={stateVal} onChange={(e)=>{setStateVal(e.target.value)}}/>
            <input type={"button"} onClick={setJwt} value={'Set JWT'} />
            <input type={"button"} onClick={getJwt} value={'Get JWT'} />
            {output}
        </>
    )
}