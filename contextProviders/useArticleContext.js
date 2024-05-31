import {createContext, useContext} from "react";

const ArticleContext = createContext()

export const ArticleProvider = ({children})=>{

    return(
        <ArticleContext.Provider value={{}} >
            {children}
        </ArticleContext.Provider>
    )
}

export function useArticleContext(){
    return useContext(ArticleContext)
}