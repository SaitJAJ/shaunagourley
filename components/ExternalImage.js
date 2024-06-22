import QueryClientWrapper from "@/components/QueryClientWrapper";
import {QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import LoadingBar from "@/components/LoadingBar";
import FuzzyImage from "@/components/FuzzyImage";

export function EditExternalImage({imageKeys}){
    const uploadPhoto = async ({file})=>{
        return new Promise(async (resolve, reject) => {
            const formData = new FormData()
            formData.append('file', file)
            Object.entries(imageKeys).map(entry=>{
                formData.append(entry[0],entry[1])
            })
            let response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/images/upsertone", {
                method: "POST",
                body: formData
            })
            if (response.ok) {
                resolve(file)
            }
            reject("response")
        })
    }


    const getImages=async ()=>{
        return new Promise(async (resolve, reject) => {
            // let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/images/findone", {
            //     method: "POST",
            //     body: JSON.stringify(imageKeys)
            // })
            // if (!response.ok) {
            //     throw new Error("Received status that was not ok!")
            // }
            // let data = await response.json()
            // if(data.document === null){
            //     resolve({src:null})
            // }else{
            //     let blob = new Blob([Buffer.from(data.document.srcBuffer)])
            //     let newData = {src:URL.createObjectURL(blob)}
            //     resolve(newData)
            // }
        })
    }

    const {data,error,isFetching, refetch} = useQuery({queryKey:['images',...Object.values(imageKeys)],queryFn:getImages})

    const queryClient = useQueryClient();
    queryClient.setMutationDefaults(['imageMutation'],{
        mutationFn:uploadPhoto,
        onError:(error,variables,context)=>{
            // console.log(error)
            // console.log(variables)
            queryClient.setQueryData(
                ['images',...Object.values(imageKeys)],
                context.previousImage
            )
        },
        onSuccess:()=>{
            // *********************************************************************
            //  This does not work when also calling onMutate! Comment it out if fetching data from database after
            //  upload without eagerly setting content!
            //
            // *********************************************************************
            // queryClient.refetchQueries({
            //     queryKey:['images',panelId, imagePosition]
            // })
        },
        onMutate:async ({file})=>{
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['images',...Object.values(imageKeys)] })
            // Snapshot the previous value
            const previousImage = await queryClient.getQueryData(['images',...Object.values(imageKeys)])
            let newData = Object.assign({src:URL.createObjectURL(file)})
            // setImageSource(newData)
            // Optimistically update to the new value
            queryClient.setQueryData(['images',...Object.values(imageKeys)], newData)
            return { previousImage, newData }
        },
        onSettled: (newTodo) => {
            queryClient.invalidateQueries({ queryKey: ['images',...Object.values(imageKeys)] })
        },
    })
    const mutation = useMutation({mutationKey:["imageMutation"]})
    const handleDrop=(e)=>{
        e.preventDefault()
        Object.values(e.dataTransfer.files).map(file=>{
            if(file.type.includes('image')){
                mutation.mutate({file})
            }
        })
    }
    return(
        <QueryClientWrapper givenClient={queryClient}>
            {data?
                mutation.isPending?
                    <FuzzyImage image={data.src}/>
                    :
                    <div className={'object-contain flex'} onDragOver={(e)=>e.preventDefault()} onDrop={handleDrop}>
                        <img className={'object-contain'} alt={'alt'} draggable={false} src={data.src}/>
                    </div>
                :
                isFetching?
                    <LoadingBar/>
                    :
                    <>error!</>
            }
        </QueryClientWrapper>
    )
}
export function DisplayExternalImage({imageKeys}){
    const getImages=async ()=>{
        return new Promise(async (resolve, reject) => {
            let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/images/findone", {
                method: "POST",
                body: JSON.stringify(imageKeys)
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
                resolve(newData)
            }
        })
    }

    const {data,error,isFetching, refetch} = useQuery({queryKey:['images',...Object.values(imageKeys)],queryFn:getImages})

    return(
        <QueryClientWrapper givenClient={queryClient}>
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
        </QueryClientWrapper>
    )
}