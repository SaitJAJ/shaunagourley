'use client'
import {useState} from "react";
import PodcastEmbed from "@/components/podcast/PodcastEmbed";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

export default function NewPodcast(){
    const [snippet, setSnippet] = useState()
    const [podcast, setPodcast] = useState()
    const handleClick=async () =>  {
        let element = document.getElementById('youtubeUrl');
        console.log(element.value)
        let videoIds = []
        element.value.split(',').map(url=>{
            videoIds.push(url.split("?v=")[1].split('&')[0])
        })
        // let videoIds = (element.value.split(',')[0].split("?v=")[1].split('&')[0])
        console.log(process.env.NEXT_PUBLIC_YOUTUBE_API_KEY)
        let res = await fetch("https://www.googleapis.com/youtube/v3/videos?"+new URLSearchParams({
            key:process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
            part:["snippet"],
            id:videoIds,
        }))
        console.log(res)
        if(res.ok){
            let data = await res.json();
            console.log(data)
            setSnippet(data)
            setPodcast(data.items[0])
        }
    }
    const router = useRouter();
    const addPodcast = async (podcast)=>{
        console.log(podcast)
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/podcasts/insertone",{
            method:"POST",
            body:JSON.stringify({
                title:podcast.snippet.title,
                description:podcast.snippet.title,
                url:`https://www.youtube.com/embed/${podcast.id}`,
                thumbnail:podcast.snippet.thumbnails.medium.url,
            })
        })
        if(response.ok){
            let data = await response.json()
            console.log(data)
            router.push(`/account/podcasts/${data.insertedId}`)
        }
    }
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
        <div className={'grid'}>
            <input type={'text'} id={'youtubeUrl'}/>
            <input type={'button'} onClick={handleClick} value={'View youtube properties'}/>
            <div className={'flex'} >
                {snippet?snippet.items.map(podcast=>{
                    return(<PodcastEmbed key={podcast.id} podcast={podcast} mutation={mutation} addPodcast={addPodcast} />)
                }):<></>}
            </div>
            <pre>
                {JSON.stringify(snippet,null,2)}
            </pre>
        </div>
    )
}