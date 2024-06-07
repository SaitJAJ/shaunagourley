'use client'
import {useState} from "react";

export default function Dev(){
    const [stateVal,setStateVal] = useState("Default Val")
    const [output,setOutput] = useState("")
    const setJwt=async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/test",{
            method:"POST",
            body:JSON.stringify({data:stateVal})
        })
    }
    const getJwt=async () => {
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/test")
        let data = (await res.json())
        console.log(JSON.stringify(data))
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