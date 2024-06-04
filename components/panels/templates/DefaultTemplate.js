import {Base} from "next/dist/client/components/react-dev-overlay/internal/styles/Base";
import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

export default function DefaultTemplate({panel,handleInput}){


    useEffect(()=>{
        console.log(panel.paragraphs)
        if(panel.paragraphs){
            console.log(panel.paragraphs)
            panel.paragraphs.map((text,index)=>{
                // document.getElementById(`p:${index}`).innerHTML = text;
            })
        }

    },[])

    return(
        <BaseTemplate>
            <p>
                {panel.template}
            </p>
            <p>{panel._id}</p>
            <p className={'border-black border min-h-[3.2lh] caret-black p-[.1lh]'} id={'p:0'} suppressContentEditableWarning dangerouslySetInnerHTML={{__html:panel.paragraphs?panel.paragraphs[0]:""}} contentEditable onInput={(e)=>handleInput(e,panel)}>
                {/*{panel1}*/}
            </p>
            <input type={'button'} value={'Update Immediately'} onClick={()=>{handleInput.flush()}}/>
        </BaseTemplate>
    )
}