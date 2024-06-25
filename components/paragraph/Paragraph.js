import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useDebouncedCallback} from "use-debounce";
import {useEffect, useState} from "react";
import MyTiptap from "@/components/MyTiptap";
import DOMPurify from 'dompurify';
import MovableWrapper from "@/components/MovableWrapper";


export function EditableParagraph({panel,children}){
    const queryClient = useQueryClient()
    const [paragraphContent, setParagraphContent] = useState(()=>{
        if(panel.paragraphs){
            return(panel.paragraphs[0])
        }
        return ("")
    })

    const [editParagraph, setEditParagraph] = useState(false)
    const [cursorPosition,setCursorPosition] = useState()
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
    const updatePanel =  useDebouncedCallback(()=>{
        let newPanel = Object.assign({paragraphs:[]},panel);
        // let [editType,editLocation] = e.target.id.split(':')
        // switch(editType){
        //     case("p"):
        //         if(newPanel.paragraphs){
        //             let panelContent =
                    newPanel.paragraphs[0] = paragraphContent
        console.log(paragraphContent)
                    // changeCursor()
                    // setCursorPosition()
        //             break
        //         }
        //         break
        //     case("i"):
        //         break
        // }
        mutation.mutate(newPanel)
    },3500)
    const changeCursor=()=>{
        // console.log("changing cursor")
        let contentEle = document.getElementById("p:0")
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(contentEle, contentEle.childNodes.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    const handleInput=(editor)=>{
        setParagraphContent(editor.getHTML())
        console.log("Now call update panel")
        updatePanel()
    }
    return(
        <>
            <MovableWrapper >
                <MyTiptap content={paragraphContent} onInput={handleInput}>

                </MyTiptap>
            </MovableWrapper>

            <>
                {children}
                <p className={'p-[.1lh] min-h-60 overflow-clip'}  id={'p:0'} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(paragraphContent)}}>
                </p>
            </>



        </>
        )
}
export function DisplayParagraph(){

    return(
        <>
        </>
    )
}
