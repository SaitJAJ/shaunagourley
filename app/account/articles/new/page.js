import NewArticle from "@/components/NewArticle";
import ListArticles from "@/components/ListArticles";
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