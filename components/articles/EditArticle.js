'use client'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import LoadingBar from "@/components/LoadingBar";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import {ArticleProvider} from "@/contextProviders/useArticleContext";
import {DisplayArticlePanels, EditableArticlePanels} from "@/components/panels/ArticlePanels";

export default function EditArticle({articleId}){
    const getArticles=async () => {
        console.log(articleId)
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/articles/findone", {
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
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/articles/updateone", {
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
                        <select defaultValue={data.document.category} className={' border-2 border-black'} id={'category'}>
                            <option>
                                safety
                            </option>
                            <option>
                                health
                            </option>
                        </select>
                        <input type={'submit'} value={'Update in DB'} />
                    </form>
                    <QueryClientWrapper>
                        <ArticleProvider>
                            <EditableArticlePanels articleId={articleId}/>
                        </ArticleProvider>
                    </QueryClientWrapper>
                </>
                :
                isFetching?<LoadingBar/>:<></>
            }

            {/*<ListArticles/>*/}
        </>
    )
}