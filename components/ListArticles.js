'use client'
import {QueryClientProvider, useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import LoadingBar from "@/components/LoadingBar";

export default function ListArticles(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace,} = useRouter()
    const [searchCategory, setSearchCategory]=useState(searchParams.get('category')||'safety')
    const getArticles=async () => {
        console.log("new fetch")
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/articles/findall", {
            method: "POST",
            body: JSON.stringify({
                "category": searchCategory
            })
        })

        if (!response.ok) {
            throw new Error("Received status that was not ok!")
        }
        return response.json()
    }
    const {data,error,isFetching, refetch} = useQuery({queryKey:[searchCategory],queryFn:getArticles})


    const findClick = async ()=>{
        let query={

        }
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/articles/findall",{
            method:"POST",
            body:JSON.stringify(query)
        })
        console.log(await res.json())
    }

    const changeCategory=(e)=>{
        setSearchCategory(e.target.value)
        let params = new URLSearchParams(searchParams)
        if(e.target.value !== ''){
            params.set(e.target.id,e.target.value)
        }else{
            params.delete(e.target.id)
        }
        replace(`${pathname}?${params.toString()}`,{scroll:false});
    }
    return(
        <div className={'border-2 border-black bg-gray-300'}>
                <div className={'flex justify-evenly'}>
                    <p>
                        Current Category: {searchCategory}
                    </p>
                    <label className={'flex'}>
                        <p>Chose Category</p>
                        <select defaultValue={searchCategory} className={'border-[2px] border-gray-500 mx-2'} id={'category'} onChange={changeCategory}>
                            <option value={'health'}>
                                health
                            </option>
                            <option value={'safety'}>
                                safety
                            </option>
                        </select>
                    </label>
                </div>
            <div className={'h-52 flex justify-evenly'}>
                {
                    data?
                        <div className={'flex overflow-x-auto w-full justify-evenly'}>
                            {Object.values(data.documents).map(article=>{
                                return(
                                    <div className={'grid shrink-0 grow-0 basis-52 border-2 mx-1 my-2 text-center content-end'} key={article._id}>
                                        <p>
                                            {article.title}
                                        </p>
                                        <input type={'button'} onClick={()=> {
                                            replace(`/account/articles/${article._id}`)
                                        }}/>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        isFetching
                            ?
                            <LoadingBar/>
                            :
                            <>Something went wrong!</>

                }
            </div>
                <input type={'button'} onClick={refetch} value={'refresh query'}/>
        </div>
    )
}