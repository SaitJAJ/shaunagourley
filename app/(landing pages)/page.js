import ListArticles from "@/components/articles/ListArticles";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import Dev from "@/components/Dev";

export default function Page(){

  return(
      <main>
          <h1 className={'w-full text-center '}>Articles section</h1>
              <QueryClientWrapper>
                  {/*<Suspense fallback={<></>}>*/}
                      <ListArticles/>
                  {/*</Suspense>*/}
              </QueryClientWrapper>
          <Dev/>
      </main>
  )
}