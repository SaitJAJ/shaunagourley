import LoadingBar from "@/components/LoadingBar";

export default function FuzzyImage({image}){
    return(
        <>
            <div className={'fixed z-10 mx-10 my-20'}>
                <LoadingBar />
            </div>
            <img alt={'fuzzy image'} src={image} className={'blur-lg'}/>
        </>
    )
}