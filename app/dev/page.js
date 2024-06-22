'use client'
import QueryClientWrapper from "@/components/QueryClientWrapper";
import {DisplayDefaultImageTemplate} from "@/components/panels/templates/DefaultImageTemplate";
import {EditableArticlePanels} from "@/components/panels/ArticlePanels";
import DevPanel from "@/components/panels/DevPanel";
import MyTiptap from "@/components/MyTiptap";

export const runtime = 'edge'
export default function Page(){

    return(
        <>
            <MyTiptap/>
            {/*<QueryClientWrapper>*/}
            {/*    /!*<EditableArticlePanels articleId={"6658e0ca4ae13806296928cb"}/>*!/*/}
            {/*    <DevPanel/>*/}
            {/*</QueryClientWrapper>*/}
        </>
    )
}