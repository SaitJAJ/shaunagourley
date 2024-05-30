import ListArticles from "@/components/ListArticles";
import {Suspense} from "react";
import QueryClientWrapper from "@/components/QueryClientWrapper";

export default function Page(){
  return(
      <main>
          <h1 className={'w-full text-center '}>Articles section</h1>
              <QueryClientWrapper>
                  {/*<Suspense fallback={<></>}>*/}
                      <ListArticles/>
                  {/*</Suspense>*/}
              </QueryClientWrapper>
      </main>
  )
}