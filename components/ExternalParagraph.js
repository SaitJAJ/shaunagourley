import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useDebouncedCallback} from "use-debounce";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export function EditableExternalParagraph({paragraphs,panelId}){
    const queryClient = useQueryClient()
    const editArticle=async (paragraph)=>{
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/panels/updateone", {
            method: "POST",
            body: JSON.stringify({
                filter: {
                    _id: {"$oid": panelId}
                },
                update:{
                    "$set":{
                        paragraphs:paragraph
                    }
                }
            })
        })
        console.log(response)
    }
    queryClient.setMutationDefaults(["panelParagraphs"],
        {
            mutationFn:editArticle,
            onMutate: async (paragraphs) => {
                // Cancel any outgoing refetches
                // (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries({ queryKey: ['panels', panelId] })

                // Snapshot the previous value
                const previousTodo = queryClient.getQueryData(['panels', panelId])
                let newDocument = {document:{paragraphs,...previousTodo.document}}
                // Optimistically update to the new value
                queryClient.setQueryData(['panels', panelId], newDocument)

                // Return a context with the previous and new todo
                return { previousTodo, newDocument }
            },
            // onSuccess:()=>{
            //     queryClient.refetchQueries({
            //         queryKey:['panels',panelId]
            //     })
            // }
        })
    const mutation = useMutation({mutationKey:["panelParagraphs"]})
    const handleInput =  (e)=>{
        e.preventDefault()
        let newParagraphs = Object.assign([],paragraphs);
        let panelContent = (e.target.innerHTML)
        newParagraphs[e.target.id] = panelContent
        console.log(newParagraphs)
        mutation.mutate(newParagraphs)
    }
    return(
            <div className={'grid w-full'}>
                {paragraphs.length===0&&
                    <p className={'p-[.1lh] w-full min-h-60 overflow-clip border-black border-2'}  id={'p:0'} suppressContentEditableWarning contentEditable onInput={handleInput}>
                    </p>
                }
                {paragraphs.map((paragraph,index)=>{
                    return(
                        <p className={'p-[.1lh] w-full min-h-60 overflow-clip border-black border-2'} key={`${panelId}:${index}`} id={index} suppressContentEditableWarning dangerouslySetInnerHTML={{__html:paragraph||""}} contentEditable onInput={handleInput}>
                        </p>
                    )
                })}
                <input type={'button'} value={'Update Immediately'} onClick={()=>{handleInput.flush()}}/>
            </div>

    )
}