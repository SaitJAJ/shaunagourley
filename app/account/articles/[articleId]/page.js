export const runtime='edge'

// export const metadata={
//     title:"Articles"
// }
export default function Page({params}){
    return(
        <>
            <h1>Article</h1>
            <h2>{params.articleId}</h2>
        </>
    )
}