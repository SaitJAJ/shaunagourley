
import QueryClientWrapper from "@/components/QueryClientWrapper";
import DisplayArticle from "@/components/articles/DisplayArticle";

export const runtime='edge'
export default function Page({params}){
    return(
        <div className={'border-2 border-black'}>
            <QueryClientWrapper>
                <DisplayArticle articleId={params.articleId}/>
            </QueryClientWrapper>
        </div>
    )
}