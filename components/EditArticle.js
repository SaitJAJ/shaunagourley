'use client'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ListArticles from "@/components/ListArticles";
import LoadingBar from "@/components/LoadingBar";
import ListPanels from "@/components/ListPanels";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import NewPanel from "@/components/NewPanel";
import ArticlePanels from "@/components/ArticlePanels";

export default function EditArticle({articleId}){
    const getArticles=async () => {
        console.log(articleId)
        let response = await fetch("http://localhost:3000/api/articles/findone", {
            method: "POST",
            body: JSON.stringify({
                _id:{"$oid":articleId}
            })
        })

        if (!response.ok) {
            throw new Error("Received status that was not ok!")
        }
        return response.json()
    }
    const editArticle=async (data)=>{
        console.log(data)
        let response = await fetch("http://localhost:3000/api/articles/updateone", {
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
    const {data,error,isFetching, refetch} = useQuery({queryKey:[articleId],queryFn:getArticles})
    console.log(data)
    return(
        <>
            {articleId}
            {data?
                <>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        console.log(e)
                        mutation.mutate({title:e.target.title.value,category:e.target.category.value})
                    }}>
                        <input type={'text'} id={'title'} defaultValue={data.document.title}/>
                        <select className={' border-2 border-black'} id={'category'}>
                            <option selected={data.document.category==='safety'} className={'active:bg-yellow-200'}>
                                safety
                            </option>
                            <option selected={data.document.category==='safety'}>
                                health
                            </option>
                        </select>
                        <input type={'submit'} value={'Update in DB'} />
                    </form>
                    <QueryClientWrapper>
                        <ArticlePanels articleId={articleId}/>
                    </QueryClientWrapper>
                </>
                :
                isFetching?<LoadingBar/>:<></>


            }

            {/*<ListArticles/>*/}
        </>
    )
}