import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";
import {DisplayPanelImage, EditablePanelImage} from "@/components/panels/PanelImage";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import {EditableParagraph} from "@/components/paragraph/Paragraph";
import {DisplayExternalImage, EditExternalImage} from "@/components/ExternalImage";

export function EditableParagraphImageRight({panel}){
    return(
        <BaseTemplate>
            <p>
                {panel.template}
            </p>
            <p>{panel._id}</p>
            <div className={'h-fit min-h-60 border-black border caret-black '}>
                <QueryClientWrapper>
                    <div className={'h-60 flex justify-center float-right min-h-8'}>
                        <EditExternalImage imageKeys={{panelId:panel._id,imagePosition:"1"}}/>
                    </div>
                </QueryClientWrapper>
                {/*<QueryClientWrapper>*/}
                {/*    <EditableParagraph panel={panel}/>*/}
                {/*</QueryClientWrapper>*/}
            </div>
        </BaseTemplate>
    )
}
export function DisplayParagraphImageRight({panel}){
    let imageQueryClient = useQueryClient()
    console.log(panel)
    return(
        <BaseTemplate>
            <div className={'h-fit caret-black '}>
                <div className={'h-60 flex justify-center float-left min-h-8'}>
                    <DisplayExternalImage imageKeys={{panelId:panel._id,imagePosition:"1"}}/>
                </div>
                <QueryClientWrapper>
                    <EditableParagraph panel={panel}/>
                </QueryClientWrapper>
            </div>
        </BaseTemplate>
    )
}