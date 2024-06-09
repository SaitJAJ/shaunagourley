import PodcastEdit from "@/components/podcast/PodcastEdit";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export default function Page({params}){
    return(
        <QueryClientWrapper>
            <PodcastEdit podcastId={params.podcastId}/>
        </QueryClientWrapper>
    )

}