'use client'
import {DisplayDefaultTemplate, EditableDefaultTemplate} from "@/components/panels/templates/DefaultTemplate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
    DisplayDefaultImageTemplate,
    EditableDefaultImageTemplate
} from "@/components/panels/templates/DefaultImageTemplate";
import {useDebouncedCallback} from "use-debounce";
import {DisplayParagraphImageLeft, EditableParagraphImageLeft} from "@/components/panels/templates/ParagraphImageLeft";
import {EditableParagraphImageRight} from "@/components/panels/templates/ParagraphImageRight";

export function EditableListPanels({panels}){
    const queryClient = useQueryClient()
    const editArticle=async (panel)=>{
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/panels/updateone", {
            method: "POST",
            body: JSON.stringify({
                filter: {
                    _id: {"$oid": panel._id}
                },
                update:{
                    "$set":{
                        title:panel.title,
                        category:panel.category,
                        paragraphs:panel.paragraphs
                    }
                }
            })
        })
    }
    const mutation = useMutation(
        {
            mutationFn:editArticle,
            onMutate: async (panel) => {
                // Cancel any outgoing refetches
                // (so they don't overwrite our optimistic update)
                // await queryClient.cancelQueries({ queryKey: ['panels', panel._id] })

                // Snapshot the previous value
                const previousTodo = queryClient.getQueryData(['panels', panel._id])

                // Optimistically update to the new value
                queryClient.setQueryData(['panels', panel._id], panel)

                // Return a context with the previous and new todo
                return { previousTodo, panel }
            },
            onSuccess:()=>{
                queryClient.refetchQueries({
                    queryKey:['panels', panel._id]
                })
            }
        })
    const handleInput =  useDebouncedCallback((e,panel)=>{
        e.preventDefault()
        let newPanel = Object.assign({paragraphs:[]},panel);
        let [editType,editLocation] = e.target.id.split(':')
        switch(editType){
            case("p"):
                if(newPanel.paragraphs){
                    let panelContent = e.target.innerHTML
                    panelContent.replace("<div>",'')
                    panelContent.replace("</div>",'')
                    console.log(panelContent)
                    newPanel.paragraphs[editLocation] = panelContent
                    break
                }
                break
            case("i"):
                break
        }
        console.log("Mutating here")
        mutation.mutate(newPanel)
    },7500)

    return(
        <>
            {Object.values(panels).map((panel,index)=>{
                switch(panel.template){
                    case(1):
                        return(
                            <EditableDefaultTemplate key={panel._id} panel={panel} mutation={mutation} handleInput={handleInput}/>
                        )
                    case(2):
                        return(
                            <EditableDefaultImageTemplate key={panel._id} panel={panel} mutation={mutation} handleInput={handleInput} />
                        )
                    case(3):
                        return(
                            <EditableParagraphImageLeft key={panel._id} panel={panel} mutation={mutation} handleInput={handleInput} />
                        )
                    case(4):
                        return(
                            <EditableParagraphImageRight key={panel._id} panel={panel} mutation={mutation} handleInput={handleInput} />
                        )
                    default:
                        return(
                            <EditableParagraphImageLeft key={panel._id} panel={panel} mutation={mutation} handleInput={handleInput}/>
                        )
                }
            })}
        </>
    )
}

export function DisplayListPanels({panels}){
    return(
        <>
            {Object.values(panels).map((panel,index)=>{
                switch(panel.template){
                    case(1):
                        return(
                            <DisplayDefaultTemplate key={panel._id} panel={panel} />
                        )
                    case(2):
                        return(
                            <DisplayDefaultImageTemplate key={panel._id} panel={panel} />
                        )
                    default:
                        return(
                            <DisplayParagraphImageLeft key={panel._id} panel={panel}/>
                        )
                }
            })}
        </>
    )
}