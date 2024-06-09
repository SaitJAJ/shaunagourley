'use client'
import {useQuery} from "@tanstack/react-query";

export default function PodcastList(){

    const getPodcasts=async () => {
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/podcasts/findall", {
            method: "POST",
            body: JSON.stringify({

            })
        })
        if (!response.ok) {
            throw new Error("Received status that was not ok!")
        }
        return response.json()
    }
    const {data,error,isFetching, refetch} = useQuery({queryKey:"podcasts",queryFn:getPodcasts})


    return(
        <>

        </>
    )
}