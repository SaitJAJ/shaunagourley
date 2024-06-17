import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useDebouncedCallback} from "use-debounce";

export function EditableParagraph({panel}){
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
                await queryClient.cancelQueries({ queryKey: ['panels', panel._id] })

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
    const handleInput =  useDebouncedCallback((e)=>{
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
        mutation.mutate(newPanel)
    },7500)

    return(
        <>
            <p>{panel._id}</p>
            <p className={'p-[.1lh] min-h-60 overflow-clip'}  id={'p:0'} suppressContentEditableWarning dangerouslySetInnerHTML={{__html:panel.paragraphs?panel.paragraphs[0]:""}} contentEditable onInput={handleInput}>
            </p>
            <input type={'button'} value={'Update Immediately'} onClick={()=>{handleInput.flush()}}/>
        </>
        )
}
export function DisplayParagraph(){

    return(
        <>
        </>
    )
}
