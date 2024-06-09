import NewPodcast from "@/components/podcast/NewPodcast";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export default function Page(){
    return(
        <>
            <QueryClientWrapper>
                <NewPodcast/>
            </QueryClientWrapper>
        </>
    )
}