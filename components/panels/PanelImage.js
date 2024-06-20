import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import LoadingBar from "@/components/LoadingBar";
import FuzzyImage from "@/components/FuzzyImage";

export const runtime = 'edge'

export function EditablePanelImage({panelId,imagePosition}){

    const uploadPhoto = async ({file, imagePosition, panelId})=>{
        console.log("upload")
        return new Promise(async (resolve, reject) => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('panelId', panelId)
            formData.append('imagePosition', imagePosition)
            let response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/images/upsertone", {
                method: "POST",
                body: formData
            })
            if (response.ok) {
                resolve(file)
            }
            reject(response)
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

    const {data,error,isFetching, refetch} = useQuery({queryKey:['images',panelId, imagePosition],queryFn:getImages})

    const queryClient = useQueryClient();
    queryClient.setMutationDefaults(['imageMutation'],{
        mutationFn:uploadPhoto,
        onError:(error,variables,context)=>{
            console.log("On Error called!")
            // console.log(error)
            // console.log(variables)
            console.log(context)
            queryClient.setQueryData(
                ['images',panelId,imagePosition],
                context.previousImage
            )
        },
        onSuccess:()=>{
            console.log('success')
            // *********************************************************************
            //  This does not work when also calling onMutate! Comment it out if fetching data from database after
            //  upload without eagerly setting content!
            //
            // *********************************************************************
            // queryClient.refetchQueries({
            //     queryKey:['images',panelId, imagePosition]
            // })
        },
        onMutate:async ({file, imagePosition, panelId})=>{
            console.log("mutate")
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['images',panelId, imagePosition] })
            // Snapshot the previous value
            const previousImage = await queryClient.getQueryData(['images',panelId, imagePosition])
            console.log("previous Data",previousImage)
            let newData = Object.assign({src:URL.createObjectURL(file)})
            console.log("from Mutates",newData)
            // setImageSource(newData)
            // Optimistically update to the new value
            queryClient.setQueryData(['images',panelId, imagePosition], newData)
            return { previousImage, newData }
        },
        onSettled: (newTodo) => {
            console.log("on Settled")
            queryClient.invalidateQueries({ queryKey: ['images',panelId, imagePosition] })
        },
    })
    const mutation = useMutation({mutationKey:["imageMutation"]})
    // const mutation = useMutation(
    //     {
    //         mutationFn:uploadPhoto,
    //         onError:(error,variables,context)=>{
    //             console.log("On Error called!")
    //             // console.log(error)
    //             // console.log(variables)
    //             console.log(context)
    //             queryClient.setQueryData(
    //                 ['images',panelId,imagePosition],
    //                 context.previousImage
    //             )
    //         },
    //         onSuccess:()=>{
    //             console.log('success')
    //             // *********************************************************************
    //             //  This does not work when also calling onMutate! Comment it out if fetching data from database after
    //             //  upload without eagerly setting content!
    //             //
    //             // *********************************************************************
    //             // queryClient.refetchQueries({
    //             //     queryKey:['images',panelId, imagePosition]
    //             // })
    //         },
    //         onMutate:async ({file, imagePosition, panelId})=>{
    //             console.log("mutate")
    //             // Cancel any outgoing refetches
    //             // (so they don't overwrite our optimistic update)
    //             await queryClient.cancelQueries({ queryKey: ['images',panelId, imagePosition] })
    //             // Snapshot the previous value
    //             const previousImage = await queryClient.getQueryData(['images',panelId, imagePosition])
    //             console.log("previous Data",previousImage)
    //             let newData = Object.assign({src:URL.createObjectURL(file)})
    //             console.log("from Mutates",newData)
    //             // setImageSource(newData)
    //             // Optimistically update to the new value
    //             queryClient.setQueryData(['images',panelId, imagePosition], newData)
    //             return { previousImage, newData }
    //         },
    //         onSettled: (newTodo) => {
    //             console.log("on Settled")
    //             queryClient.invalidateQueries({ queryKey: ['images',panelId, imagePosition] })
    //         },
    //     })

    const handleDrop=(e)=>{
        e.preventDefault()
        Object.values(e.dataTransfer.files).map(file=>{
            if(file.type.includes('image')){
                mutation.mutate({file,imagePosition,panelId})
            }
        })
    }
    return(
        <>
            {data?
                mutation.isPending?
                    <FuzzyImage image={data.src}/>
                    :
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
    // useEffect(()=>{
    //     console.log("data",data)
    // },[data])
    return(
        <>
            {data?
                <div className={'object-contain flex'} >
                    <img className={'object-contain'} alt={'alt'} src={data.src}/>
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
