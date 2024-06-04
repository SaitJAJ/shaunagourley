import {useState} from "react";

export default function NewPanel({addArticle}){
    const [selectedTemplate,setSelectedTemplate]=useState(1)
    const selectArticleTemplate=()=>{
        addArticle(selectedTemplate)
    }
    const templates=[
        {
            title:"DefaultText",
            image:'image'
        },
        {
            title:"DefaultImage",
            image:'image'
        },
        {
            title:"TextImageLeft",
            image:'image'
        },
    ]

    const selectedBorder="border-2 border-blue-500 p-2"
    const defaultBorder="border-2 border-black m-2"

    return(
        <div className={'grid'}>
            <input type={"button"} value={'Add DatabaseObjects'} onClick={selectArticleTemplate}/>
            <div className={'flex p-2'}>
                {templates.map((template,index)=>{
                    return(
                        <div className={selectedTemplate===index+1?selectedBorder:defaultBorder} id={index+1} key={index+1} onClick={(e)=>{
                            console.log(e.target.id)
                            setSelectedTemplate(parseInt(e.target.id))
                        }}>
                            <p id={index+1}>{template.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}