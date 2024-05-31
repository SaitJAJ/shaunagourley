import ListArticles from "@/components/ListArticles";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export const runtime = 'edge'

export const metadata={
    title:"Articles"
}
export default function Page(){

    return(
        <>
            <h1>Articles</h1>
            <QueryClientWrapper>
                <ListArticles/>
            </QueryClientWrapper>

        </>
    )
}