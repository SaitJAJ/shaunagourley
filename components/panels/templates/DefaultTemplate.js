import {Base} from "next/dist/client/components/react-dev-overlay/internal/styles/Base";
import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

export default function DefaultTemplate({panel,mutation}){

    const handleInput =  useDebouncedCallback((e)=>{
        e.preventDefault()
        let newPanel = Object.assign({paragraphs:[]},panel);
        let [editType,editLocation] = e.target.id.split(':')
        switch(editType){
            case("p"):
                if(newPanel.paragraphs){
                    newPanel.paragraphs[editLocation] = e.target.innerText
                    break
                }
                break
            case("i"):
                break
        }
        mutation.mutate(newPanel)
    },7500)
    useEffect(()=>{
        console.log(panel.paragraphs)
        if(panel.paragraphs){
            console.log(panel.paragraphs)
            panel.paragraphs.map((text,index)=>{
                document.getElementById(`p:${index}`).innerText = text;
            })
        }

    },[])

    return(
        <BaseTemplate>
            <p>{panel._id}</p>
            <p className={'border-black border h-[3.2lh] caret-black p-[.1lh]'} id={'p:0'} suppressContentEditableWarning contentEditable onInput={handleInput}>
                {/*{panel1}*/}
            </p>
        </BaseTemplate>
    )
}