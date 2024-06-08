'use client'
import {useState} from "react";
import PodcastEmbed from "@/components/podcast/PodcastEmbed";

export default function NewPodcast(){
    const [snippet, setSnippet] = useState()
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
        }
    }
    return(
        <div className={'grid'}>
            <input type={'text'} id={'youtubeUrl'}/>
            <input type={'button'} onClick={handleClick} value={'View youtube properties'}/>
            <div className={'flex'} >
                {snippet?snippet.items.map(podcast=>{
                    return(<PodcastEmbed key={podcast.id} podcast={podcast}/>)
                }):<></>}
            </div>
            <pre>
                {JSON.stringify(snippet,null,2)}
            </pre>
        </div>
    )
}