'use client'
export default function ListPanels({panels}){

    return(
        <>
            {Object.values(panels).map((panel,index)=>{
                return(
                    <p key={index}>
                        {panel._id}
                    </p>
                )
            })}
        </>
    )
}