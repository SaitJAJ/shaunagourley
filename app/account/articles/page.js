import ListArticles from "@/components/ListArticles";

export const runtime = 'edge'

export const metadata={
    title:"Articles"
}
export default function Page(){

    return(
        <>
            <h1>Articles</h1>
            <ListArticles/>
        </>
    )
}