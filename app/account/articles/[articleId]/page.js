'use client'
import EditArticle from "@/components/articles/EditArticle";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export const runtime='edge'

// export const metadata={
//     title:"Articles"
// }
export default function Page({params}){

    return(
        <>
            <QueryClientWrapper>
                <EditArticle articleId={params.articleId}/>
                {/*<EditArticle/>*/}
            </QueryClientWrapper>
        </>
    )
}