import BaseTemplate from "@/components/panels/templates/BaseTemplate";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PanelImage from "@/components/panels/PanelImage";

export default function ParagraphImageLeft({panel,handleInput,uploadPhoto}){
    const imageQueryClient = new QueryClient()
    return(
        <BaseTemplate>
            <p>
                {panel.template}
            </p>
            <p>{panel._id}</p>
            <div className={'h-fit min-h-60 border-black border caret-black '}>
                <QueryClientProvider client={imageQueryClient}>
                    <div className={'h-60 flex float-left min-h-8'}>
                        <PanelImage panelId={panel._id} imagePosition={1} uploadPhoto={uploadPhoto}/>
                    </div>
                </QueryClientProvider>
                <p className={'p-[.1lh] min-h-60 overflow-clip'}  id={'p:0'} suppressContentEditableWarning dangerouslySetInnerHTML={{__html:panel.paragraphs?panel.paragraphs[0]:""}} contentEditable onInput={(e)=>handleInput(e,panel)}>
                </p>
            </div>
            <input type={'button'} value={'Update Immediately'} onClick={()=>{handleInput.flush()}}/>
        </BaseTemplate>
    )
}