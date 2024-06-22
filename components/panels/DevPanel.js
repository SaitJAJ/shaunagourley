import {useQuery, useQueryClient} from "@tanstack/react-query";
import {EditableParagraphImageRight} from "@/components/panels/templates/ParagraphImageRight";
import {useEffect} from "react";
import {EditExternalImage} from "@/components/ExternalImage";
import {EditableExternalParagraph} from "@/components/ExternalParagraph";

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
    const {data,error,isFetching, refetch} = useQuery({queryKey:['panels',"6668e91c72b26e2eaf824396"],queryFn:getPanel})
    return(
        <>
            {data&&
                <div className={'h-60 flex'}>
                    <EditableExternalParagraph paragraphs={data.document.paragraphs} panelId={"6668e91c72b26e2eaf824396"}/>
                </div>
            }
        </>
    )
}