'use client'

import NewPanel from "@/components/panels/NewPanel";
import ListPanels from "@/components/panels/ListPanels";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import LoadingBar from "@/components/LoadingBar";

export default function ArticlePanels({articleId}){
    const getPanels=async () => {
        console.log(articleId)
        let response = await fetch("http://localhost:3000/api/panels/findall", {
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
        let response = await fetch("http://localhost:3000/api/panels/updateone", {
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
    const addArticle=async()=>{
        let response = await fetch("http://localhost:3000/api/panels/insertone", {
            method: "POST",
            body: JSON.stringify({
                "articleId":articleId,
                "template":1
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
                <ListPanels panels={data.documents} />
                :
                isFetching?
                    <LoadingBar/>
                    :
                    <>error!</>
            }

            {/*<NewPanel/>*/}
            {/*<input type={"button"} value={'Add DatabaseObjects'} onClick={addArticle}/>*/}

        </>
    )
}