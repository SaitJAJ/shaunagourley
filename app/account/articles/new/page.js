import NewArticle from "@/components/articles/NewArticle";
import ListArticles from "@/components/articles/ListArticles";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export const runtime = 'edge'
export default async function Page(){
    return(
        <main>
            <NewArticle/>
            <QueryClientWrapper>
                {/*<Suspense fallback={<></>}>*/}
                <ListArticles/>
                {/*</Suspense>*/}
            </QueryClientWrapper>
        </main>
    )
}