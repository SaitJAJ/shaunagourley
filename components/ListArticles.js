'use client'

export default async function ListArticles(){
    const findClick = async ()=>{
        let query={

        }
        let res = await fetch("/api/articles/findall",{
            method:"POST",
            body:JSON.stringify(query)
        })
        console.log(await res.json())
    }
    const insertClick = async ()=>{
        let query={
            category:"health",
            title:"The third health blog"
        }
        let res = await fetch("/api/articles/insertone",{
            method:"POST",
            body:JSON.stringify(query)
        })
        console.log(await res.json())
    }
    return(
        <>
            <input type={'button'} onClick={findClick} value={'findall'}/>
            <input type={'button'} onClick={insertClick} value={'insert'}/>
        </>
    )
}