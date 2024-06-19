export default function FuzzyImage({image}){
    return(
        <>
            <img alt={'fuzzy image'} src={image} className={'blur-lg'}/>
        </>
    )
}