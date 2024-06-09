import {useState} from "react";

export default function PodcastEmbed({podcast,mutation,addPodcast}){
    const [editPodcast, setEditPodcast] = useState(podcast)
    return(
        <div className={'w-[700px] flex flex-col items-center'}>
            {`https://www.youtube.com/watch?v=${editPodcast.id}`}
            <h1 className={'text-4xl w-[640px] h-[2lh] overflow-ellipsis'}>{editPodcast.snippet.title}</h1>
            <iframe width={640} height={354} src={`https://www.youtube.com/embed/${editPodcast.id}`}/>
            {/*<img src={podcast.snippet.thumbnails.high.url} height={toString(podcast.snippet.thumbnails.default.height)} width={toString(podcast.snippet.thumbnails.default.width)} alt={'Youtube Thumbnail'}/>*/}
            <p className={'w-[600px]  h-60 hover:h-fit overflow-hidden'}>
                {editPodcast.snippet.description}
            </p>
            <input type={"button"} value={'Upload as podcast'} onClick={()=>{addPodcast(editPodcast)}}/>
        </div>
        )
}