'use client'
import DefaultTemplate from "@/components/panels/templates/DefaultTemplate";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export default function ListPanels({panels}){
    const queryClient = useQueryClient()
    const editArticle=async (data)=>{
        let response = await fetch("http://localhost:3000/api/panels/updateone", {
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
    return(
        <>
            {Object.values(panels).map((panel,index)=>{
                switch(panel.template){
                    case(1):
                        return(
                            <DefaultTemplate panel={panel} mutation={mutation}/>
                        )
                    case(2):
                        return(
                            <DefaultTemplate panel={panel} mutation={mutation} />
                        )
                    default:
                        return(
                            <DefaultTemplate panel={panel} mutation={mutation}/>
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