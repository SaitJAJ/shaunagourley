import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DisplayPanelImage, EditablePanelImage} from "@/components/panels/PanelImage";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import {DisplayExternalImage, EditExternalImage} from "@/components/ExternalImage";

export function EditableDefaultImageTemplate({panel,handleInput,uploadPhoto}){
    return(
        <BaseTemplate>
            <p>
                {panel.template}
            </p>
            <p>{panel._id}</p>
            <div className={'h-60 flex justify-center'}>
                <EditExternalImage imageKeys={{panelId:panel._id,imagePosition:"1"}}/>
            </div>
            <input type={'button'} value={'Update Immediately'} onClick={()=>{handleInput.flush()}}/>
        </BaseTemplate>
    )
}
export function DisplayDefaultImageTemplate({panel}){

    const imageQueryClient = new QueryClient()

    return(
        <BaseTemplate>
            <div className={'h-60 flex justify-center'}>
                <DisplayExternalImage imageKeys={{panelId:panel._id,imagePosition:"1"}}/>
            </div>
        </BaseTemplate>
    )
}