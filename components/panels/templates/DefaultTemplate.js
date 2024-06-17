import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {useEffect} from "react";
import {EditableParagraph} from "@/components/paragraph/Paragraph";

export function EditableDefaultTemplate({panel,handleInput}){

    return(
        <BaseTemplate>
            <p>
                {panel.template}
            </p>
            <p>{panel._id}</p>
            <EditableParagraph panel={panel}/>
            <input type={'button'} value={'Update Immediately'} onClick={()=>{handleInput.flush()}}/>
        </BaseTemplate>
    )
}
export function DisplayDefaultTemplate({panel,handleInput}){

    return(
        <BaseTemplate>
            {
                panel.paragraphs?
                    panel.paragraphs.map((paragraph,index)=>{
                        return(
                            <p key={`${panel._id}:${index}`} className={'caret-black p-[.1lh] border-black border'} id={'p:0'} suppressContentEditableWarning dangerouslySetInnerHTML={{__html:paragraph}}/>
                        )
                    })
                    :<></>
            }

        </BaseTemplate>
    )
}