import PodcastList from "@/components/podcast/PodcastList";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export const metadata={
    title:"Podcasts"
}
export default function Page(){

    return(
        <>
            <QueryClientWrapper>
                <PodcastList/>
            </QueryClientWrapper>
        </>
    )
}