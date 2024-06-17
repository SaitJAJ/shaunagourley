'use client'

import NewPanel from "@/components/panels/NewPanel";
import {DisplayListPanels, EditableListPanels} from "@/components/panels/ListPanels";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import LoadingBar from "@/components/LoadingBar";

export function EditableArticlePanels({articleId}){
    const getPanels=async () => {
        console.log(articleId)
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/panels/findall", {
            method: "POST",
            body: JSON.stringify(
                {
                    articleId:articleId
                })
        })
        if (!response.ok) {
            throw new Error("Received status that was not ok!")
        }

        return response.json()
    }
    const editArticle=async (data)=>{
        console.log(data)
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/panels/updateone", {
            method: "POST",
            body: JSON.stringify({
                filter: {
                    _id: {"$oid": articleId}
                },
                update:{
                    "$set":{
                        title:data.title,
                        category:data.category,
                    }
                }
            })
        })
    }
    const {data,error,isFetching, refetch} = useQuery({queryKey:[articleId],queryFn:getPanels})
    const addArticle=async(template)=>{
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/panels/insertone", {
            method: "POST",
            body: JSON.stringify({
                "articleId":articleId,
                "template":template
            })
        })
        refetch()
    }
    const queryClient = useQueryClient()
    const mutation = useMutation(
        {
            mutationFn:editArticle,
            onSuccess:()=>{
                queryClient.refetchQueries({
                    queryKey:[articleId]
                })
            }
        })
    return(
        <>
            {data?
                <EditableListPanels panels={data.documents} />
                :
                isFetching?
                    <LoadingBar/>
                    :
                    <>error!</>
            }
            <NewPanel addArticle={addArticle}/>
        </>
    )
}

export function DisplayArticlePanels({articleId}){
    const getPanels=async () => {
        console.log("Getting article Panels")
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/panels/findall", {
            method: "POST",
            body: JSON.stringify(
                {
                    articleId:articleId
                })
        })
        if (!response.ok) {
            throw new Error("Received status that was not ok!")
        }
        return response.json()
    }
    const {data,error,isFetching, refetch} = useQuery({queryKey:[articleId],queryFn:getPanels})
    return(
        <>
            {data?
                <DisplayListPanels panels={data.documents} />
                :
                isFetching?
                    <LoadingBar/>
                    :
                    <>error!</>
            }
            {/*<NewPanel addArticle={addArticle}/>*/}
        </>
    )
}