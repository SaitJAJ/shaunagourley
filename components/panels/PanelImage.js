import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import LoadingBar from "@/components/LoadingBar";

export const runtime = 'edge'

export function EditablePanelImage({panelId,imagePosition}){
    const uploadPhoto = async ({file, imagePosition, panelId})=>{
        console.log("upload")
        const formData = new FormData()
        formData.append('file',file)
        formData.append('panelId',panelId)
        formData.append('imagePosition',imagePosition)
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/images/upsertone",{
            method:"POST",
            body:formData
        })
        return(file)
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
            if(data.document === null){
                resolve({src:null})
            }else{
                let blob = new Blob([Buffer.from(data.document.srcBuffer)])
                let newData = {src:URL.createObjectURL(blob)}
                console.log("from Query",newData)
                resolve(newData)
            }
        })
    }
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:uploadPhoto,
            onSuccess:()=>{
                console.log('success')
                // *********************************************************************
                //  This does not work when also calling onMutate! Comment it out if fetching data from database after
                //  upload without eagerly setting content!
                //
                // *********************************************************************
                // queryClient.refetchQueries({
                //     queryKey:['images',panelId, imagePosition.toString()]
                // })
            },
            onMutate:async ({file, imagePosition, panelId})=>{
                console.log("mutate")
                // Cancel any outgoing refetches
                // (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries({ queryKey: ['images',panelId, imagePosition.toString()] })
                console.log(panelId,imagePosition)
                // Snapshot the previous value
                const previousImage = queryClient.getQueryData(['images',panelId, imagePosition.toString()])
                let newData = Object.assign({src:URL.createObjectURL(file)})
                console.log("from Mutates",newData)
                // setImageSource(newData)
                // Optimistically update to the new value
                queryClient.setQueryData(['images',panelId, imagePosition.toString()], newData)
                return { previousImage, newData }
                },
        })
    const handleDrop=(e)=>{
        e.preventDefault()
        Object.values(e.dataTransfer.files).map(file=>{
            if(file.type.includes('image')){
                mutation.mutate({file,imagePosition,panelId})
            }
        })
    }
    const {data,error,isFetching, refetch} = useQuery({queryKey:['images',panelId, imagePosition.toString()],queryFn:getImages})
    return(
        <>
            {data?
                <div className={'object-contain flex'} onDragOver={(e)=>e.preventDefault()} onDrop={handleDrop}>
                    <img className={'object-contain'} alt={'altt'} draggable={false} src={data.src}/>
                </div>
                :
                isFetching?
                    <LoadingBar/>
                    :
                    <>error!</>
            }
        </>
    )
}
export function DisplayPanelImage({panelId,imagePosition}){

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
            if(data.document === null){
                resolve({src:null})
            }else{
                let blob = new Blob([Buffer.from(data.document.srcBuffer)])
                resolve({src:URL.createObjectURL(blob)})
            }
        })
    }
    const {data,error,isFetching, refetch} = useQuery({queryKey:['images',panelId, imagePosition],queryFn:getImages})
    return(
        <>
            {data?
                <div className={'object-contain flex'} >
                    <img className={'object-contain'} alt={'altt'} src={data.src}/>
                </div>
                :
                isFetching?
                    <LoadingBar/>
                    :
                    <>error!</>
            }
        </>
    )
}
