'use client'
export default function NewArticle(){
    const insert = async (query)=>{

        let res = await fetch("/api/articles/insertone",{
            method:"POST",
            body:JSON.stringify(query)
        })
        console.log(await res.json())
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(e)
        let query={
            category:e.target.category.value,
            title:e.target.title.value
        }
        await insert(query)
    }
    return(
        <>
            <h1 className={'text-center'}>New Article</h1>
            <form onSubmit={handleSubmit} className={'grid w-full border-2 border-black px-40 justify-evenly'}>
                <input type={'text'} required className={'text-5xl text-center'} id={'title'} placeholder={'title'}/>
                    <select className={' border-2 border-black'} id={'category'}>
                        <option className={'active:bg-yellow-200'}>
                            safety
                        </option>
                        <option>
                            health
                        </option>
                    </select>
                    {/*<input type={'text'} placeholder={'title'}/>*/}
                <input className={"hover:bg-yellow-100 active:bg-green-200"} type={'submit'} value={'Create new Article'}/>
            </form>
        </>
    )
}