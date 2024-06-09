'use client'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";

export default function PodcastEdit({podcastId}){

    const getPodcast=async ()=>{
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/podcasts/findall", {
            method: "POST",
            body: JSON.stringify(
                {
                    _id:{"$oid":podcastId}
                })
        })
        if (!response.ok) {
            throw new Error("Received status that was not ok!")
        }

        return response.json()
    }

    const {data,error,isFetching, refetch} = useQuery({queryKey:[podcastId],queryFn:getPodcast})
    useEffect(() => {
        console.log(data)
    }, [data]);
    const editPodcast = async (podcast)=>{
        console.log(podcast)
        // let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/podcasts/upsertone", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         filter: {
        //             _id: {"$oid": podcast._id}
        //         },
        //         update:{
        //             "$set":{
        //                 title:podcast.title,
        //                 category:podcast.category,
        //             }
        //         }
        //     })
        // })
    }
    const queryClient = useQueryClient()
    const mutation = useMutation(
        {
            mutationFn:editPodcast,
            onSuccess:(podcast)=>{
                // queryClient.refetchQueries({
                //     queryKey:["podcasts",podcast._id]
                // })
            }
        })
    return(
        <>
            {data?
            <div className={'w-[700px] flex flex-col items-center'}>
                <h1 className={'text-4xl w-[640px] h-[2lh] overflow-ellipsis'}>{data.documents[0].title}</h1>
                <iframe width={640} height={354} src={data.documents[0].url}/>
            </div>
                :
                isFetching?
                    <>Loading</>
                    :
                    <></>
            }
        </>
    )
}