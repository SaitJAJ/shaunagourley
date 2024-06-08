'use client'
export default function NewPodcast(){
    const handleClick=async () => {

        let element = document.getElementById('youtubeUrl');
        console.log(element.value)
        console.log(process.env.NEXT_PUBLIC_YOUTUBE_API_KEY)
        let res = await fetch("https://www.googleapis.com/youtube/v3/videos?"+new URLSearchParams({
            key:process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
            part:["snippet"],
            id:"0PZsJN69nEI"
        }))
        console.log(res)
        if(res.ok){
            let data = await res.json();
            console.log(data)
            console.log(data.snippet)
        }
    }
    return(
        <>
            <input type={'text'} id={'youtubeUrl'}/>
            <input type={'button'} onClick={handleClick} value={'View youtube properties'}/>
        </>
    )
}