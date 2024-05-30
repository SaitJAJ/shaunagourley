'use client'
import {QueryClient, QueryClientProvider, QueryErrorResetBoundary} from "@tanstack/react-query";
// import {ErrorBoundary} from "react-error-boundary";

export default function QueryClientWrapper({children}){
    const queryClient = new QueryClient()

    return(
        <QueryClientProvider client={queryClient}>
            {/*<QueryErrorResetBoundary>*/}
            {/*    {({reset})=>(*/}
            {/*        <ErrorBoundary*/}
            {/*            onReset={reset}*/}
            {/*            fallbackRender={({resetErrorBoundary})=>(*/}
            {/*                <div>*/}
            {/*                    There was an error!*/}
            {/*                    <input type={"button"} onClick={() => resetErrorBoundary()}>Try again</input>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*        >*/}
                        {children}
            {/*        </ErrorBoundary>*/}
            {/*    )}*/}
            {/*</QueryErrorResetBoundary>*/}
        </QueryClientProvider>
    )
}