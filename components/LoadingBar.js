export default function LoadingBar(){
    return(
                <div className={'grid '}>
                    <div className="lds-ellipsis ">
                        <div className={'h-fit'}></div>
                        <div className={'h-fit'}></div>
                        <div className={'h-fit'}></div>
                        <div className={'h-fit'}></div>
                    </div>
                </div>
    )
}