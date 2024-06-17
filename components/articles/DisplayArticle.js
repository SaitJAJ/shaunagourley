'use client'
import {useQuery} from "@tanstack/react-query";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import {ArticleProvider} from "@/contextProviders/useArticleContext";
import LoadingBar from "@/components/LoadingBar";
import {DisplayArticlePanels} from "@/components/panels/ArticlePanels";
import {useEffect} from "react";

export default function DisplayArticle({articleId}){
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
    const {data,error,isFetching, refetch} = useQuery({queryKey:[articleId],queryFn:getArticles})
    useEffect(()=>{
        console.log(data)
    },[data])
    return(
       <>
           {data?
               <>
                   <h1 className={'text-4xl text-center'}>{data.document.title}</h1>
                   <QueryClientWrapper>
                       <ArticleProvider>
                           <DisplayArticlePanels articleId={articleId}/>
                       </ArticleProvider>
                   </QueryClientWrapper>
               </>
               :
               isFetching?<LoadingBar/>:<></>
           }
       </>
    )
}