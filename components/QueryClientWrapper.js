'use client'
import {QueryClient, QueryClientProvider, QueryErrorResetBoundary} from "@tanstack/react-query";
import {Suspense} from "react";
// import {ErrorBoundary} from "react-error-boundary";
export const runtime='edge'

export default function QueryClientWrapper({children,givenClient}){

    const queryClient = givenClient || new QueryClient()
    console.log("Fresh query client")
    return(
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<></>}>
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
                </Suspense>
        </QueryClientProvider>
    )
}