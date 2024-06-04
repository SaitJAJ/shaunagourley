import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PanelImage from "@/components/panels/PanelImage";

export default function DefaultImageTemplate({panel,handleInput,uploadPhoto}){

    const imageQueryClient = new QueryClient()

    return(
        <BaseTemplate>
            <p>
                {panel.template}
            </p>
            <p>{panel._id}</p>
            <QueryClientProvider client={imageQueryClient}>
                <PanelImage panelId={panel._id} imagePosition={1} uploadPhoto={uploadPhoto}/>
            </QueryClientProvider>
            <input type={'button'} value={'Update Immediately'} onClick={()=>{handleInput.flush()}}/>
        </BaseTemplate>
    )
}