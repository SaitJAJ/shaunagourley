import {useQuery, useQueryClient} from "@tanstack/react-query";
import {EditableParagraphImageRight} from "@/components/panels/templates/ParagraphImageRight";
import {useEffect} from "react";

export default function DevPanel(){
    const getPanel=async () => {
        let response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/panels/findone", {
            method: "POST",
            body: JSON.stringify(
                {
                    _id:{
                        "$oid":"6668e91c72b26e2eaf824396"
                    }
                })
        })
        if (!response.ok) {
            throw new Error("Received status that was not ok!")
        }
        return response.json()
    }
    const queryClient = useQueryClient()
    const {data,error,isFetching, refetch} = useQuery({queryKey:["panel","6668e91c72b26e2eaf824396"],queryFn:getPanel})
    return(
        <>
            {data&&
                <>
                    <EditableParagraphImageRight panel={data.document}/>
                </>
            }
        </>
    )
}