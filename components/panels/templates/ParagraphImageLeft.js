import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";
import {DisplayPanelImage, EditablePanelImage} from "@/components/panels/PanelImage";
import {EditableParagraph} from "@/components/paragraph/Paragraph";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import {DisplayExternalImage} from "@/components/ExternalImage";

export function EditableParagraphImageLeft({panel,handleInput,uploadPhoto}){
    const imageQueryClient = new QueryClient()
    return(
        <BaseTemplate>
            {/*<p>*/}
            {/*    {panel.template}*/}
            {/*</p>*/}
            {/*<p>{panel._id}</p>*/}
            <div className={'h-fit min-h-60 border-black border caret-black '}>
                <QueryClientWrapper client={imageQueryClient}>
                    <div className={'h-60 flex float-left min-h-8'}>
                        <EditablePanelImage panelId={panel._id} imagePosition={1} />
                    </div>
                </QueryClientWrapper>
                <QueryClientWrapper>
                    <EditableParagraph panel={panel}/>
                </QueryClientWrapper>
            </div>
        </BaseTemplate>
    )
}
export function DisplayParagraphImageLeft({panel}){
    let imageQueryClient = useQueryClient()
    console.log(panel)
    return(
        <BaseTemplate>
            <div className={'h-fit caret-black '}>
                <div className={'h-60 flex float-left min-h-8'}>
                    <DisplayExternalImage imageKeys={{panelId:panel._id,imagePosition:"1"}}/>
                </div>
                <p className={'p-[.1lh] min-h-60 overflow-clip'}  id={'p:0'}  dangerouslySetInnerHTML={{__html:panel.paragraphs?panel.paragraphs[0]:""}}>
                </p>
            </div>
        </BaseTemplate>
    )
}