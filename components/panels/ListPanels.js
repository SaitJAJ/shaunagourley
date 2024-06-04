'use client'
import DefaultTemplate from "@/components/panels/templates/DefaultTemplate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import DefaultImageTemplate from "@/components/panels/templates/DefaultImageTemplate";
import {useDebouncedCallback} from "use-debounce";

export default function ListPanels({panels}){
    const queryClient = useQueryClient()
    const editArticle=async (data)=>{
        let response = await fetch("http://localhost:8788/api/panels/updateone", {
            method: "POST",
            body: JSON.stringify({
                filter: {
                    _id: {"$oid": data._id}
                },
                update:{
                    "$set":{
                        title:data.title,
                        category:data.category,
                        paragraphs:data.paragraphs
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
                console.log(panel)
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
        mutation.mutate(newPanel)
    },7500)
    const uploadPhoto = async (file,imagePosition,panelId)=>{
        // console.log(file)
        // console.log(await file.arrayBuffer())
        const formData = new FormData()
        formData.append('file',file)
        formData.append('panelId',panelId)
        formData.append('imagePosition',imagePosition)
        let response = await fetch("http://localhost:8788/api/images/insertone",{
            method:"POST",
            body:formData
        })
    }
    return(
        <>
            {Object.values(panels).map((panel,index)=>{
                switch(panel.template){
                    case(1):
                        return(
                            <DefaultTemplate key={panel._id} panel={panel} mutation={mutation} handleInput={handleInput}/>
                        )
                    case(2):
                        return(
                            <DefaultImageTemplate key={panel._id} panel={panel} mutation={mutation} handleInput={handleInput} uploadPhoto={uploadPhoto}/>
                        )
                    default:
                        return(
                            <DefaultTemplate key={panel._id} panel={panel} mutation={mutation} handleInput={handleInput}/>
                        )
                }
                // return(
                //     <p key={index}>
                //         {panel._id}
                //     </p>
                // )
            })}
        </>
    )
}