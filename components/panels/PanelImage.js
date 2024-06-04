import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import ListPanels from "@/components/panels/ListPanels";
import LoadingBar from "@/components/LoadingBar";

export default function PanelImage({panelId,imagePosition}){
    const [imageSource, setImageSource] = useState()
    const uploadPhoto = async ({file, dataUrl, imagePosition, panelId})=>{
        // console.log(file)
        // console.log(await file.arrayBuffer())
        const formData = new FormData()
        formData.append('file',file)
        formData.append('panelId',panelId)
        formData.append('imagePosition',imagePosition)
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/images/upsertone",{
            method:"POST",
            body:formData
        })
    }
    const handleDrop=(e)=>{
        e.preventDefault()
        Object.values(e.dataTransfer.files).map(file=>{
            if(file.type.includes('image')){
                readFile(file)
            }
        })
    }


    const getImages=async ()=>{
        return new Promise(async (resolve, reject) => {
            let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/images/findone", {
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
            if(data.document === null){
                resolve({src:null})
            }else{
                let blob = new Blob([Buffer.from(data.document.srcBuffer)])
                resolve({src:URL.createObjectURL(blob)})
            }

        })
    }
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:uploadPhoto,
            onSuccess:()=>{
                queryClient.refetchQueries({
                    queryKey:[panelId, imagePosition]
                })
            },
            onMutate:async ({file, dataUrl, imagePosition, panelId})=>{
                console.log('called here')
                // Cancel any outgoing refetches
                // (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries({ queryKey: ['images',panelId, imagePosition] })

                // Snapshot the previous value
                const previousImage = queryClient.getQueryData(['images',panelId, imagePosition])

                let newData = {src:dataUrl}
                // Optimistically update to the new value
                queryClient.setQueryData(['images',panelId, imagePosition], newData)

                // Return a context with the previous and new todo
                return { previousImage, newData }
                },
        })
    const readFile = (file)=>{
        let reader = new FileReader();
        reader.onloadend =(e)=>{
            // console.log(e)
            let dataUrl = reader.result
            mutation.mutate({file,dataUrl,imagePosition, panelId})
        }
        reader.readAsDataURL(file)
    }
    const {data,error,isFetching, refetch} = useQuery({queryKey:['images',panelId, imagePosition],queryFn:getImages})
    return(
        <div onDragOver={(e)=>e.preventDefault()} onDrop={handleDrop}>
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
        </div>
    )
}