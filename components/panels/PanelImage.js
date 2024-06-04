import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import ListPanels from "@/components/panels/ListPanels";
import LoadingBar from "@/components/LoadingBar";

export default function PanelImage({panelId,imagePosition,uploadPhoto}){
    const [imageSource, setImageSource] = useState()

    const handleDrop=(e)=>{
        e.preventDefault()
        // console.log(e.dataTransfer.files)
        Object.values(e.dataTransfer.files).map(file=>{
            if(file.type.includes('image')){
                readFile(file)
            }
        })
    }
    const readFile = (file)=>{
        let reader = new FileReader();
        reader.onloadend =(e)=>{
            // console.log(e)
            setImageSource(reader.result)
            uploadPhoto(file,imagePosition,panelId)
        }
        reader.readAsDataURL(file)
    }

    const getImages=async ()=>{
        return new Promise(async (resolve, reject) => {
            let response = await fetch("http://localhost:8788/api/images/findone", {
                method: "POST",
                body: JSON.stringify(
                    {
                        panelId: panelId,
                        imagePosition: imagePosition.toString(),
                    })
            })
            if (!response.ok) {
                throw new Error("Received status that was not ok!")
            }
            let data = await response.json()
            console.log(data)
            let blob = new Blob([Buffer.from(data.document.srcBuffer)])
            resolve({src:URL.createObjectURL(blob)})
        })
    }
    const {data,error,isFetching, refetch} = useQuery({queryKey:[panelId, imagePosition],queryFn:getImages})
    return(
        <>
            {data?
                <>
                    <img alt={'altt'} src={data.src}/>
                </>
                :
                isFetching?
                    <LoadingBar/>
                    :
                    <>error!</>
            }

            <div className={'w-full border-black border-2 flex justify-center'}>
                <div className={'border-2 w-60 h-32 bg-green-200 '} onDragOver={(e)=>e.preventDefault()} onDrop={handleDrop}>
                </div>
            </div>

        </>
    )
}