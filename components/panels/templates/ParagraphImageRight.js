import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";
import {DisplayPanelImage, EditablePanelImage} from "@/components/panels/PanelImage";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import {EditableParagraph} from "@/components/paragraph/Paragraph";

export function EditableParagraphImageRight({panel}){
    return(
        <BaseTemplate>
            <p>
                {panel.template}
            </p>
            <p>{panel._id}</p>
            <div className={'h-fit min-h-60 border-black border caret-black '}>
                <QueryClientWrapper>
                    <div className={'h-60 flex float-right min-h-8'}>
                        <EditablePanelImage panelId={panel._id} imagePosition={1}/>
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
                <QueryClientProvider client={imageQueryClient}>
                    <div className={'h-60 flex float-left min-h-8'}>
                        <DisplayPanelImage panelId={panel._id} imagePosition={1}/>
                    </div>
                </QueryClientProvider>
                <p className={'p-[.1lh] min-h-60 overflow-clip'}  id={'p:0'}  dangerouslySetInnerHTML={{__html:panel.paragraphs?panel.paragraphs[0]:""}}>
                </p>
            </div>
        </BaseTemplate>
    )
}