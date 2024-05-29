export const runtime = 'edge'
export default async function Page(){
    return(
        <main className={'w-full h-[100vh] bg-yellow-200'}>
            <h1></h1>
            <form className={'grid w-full border-2 border-black px-40'}>
                <input type={'text'} className={'text-5xl text-center'} placeholder={'title'}/>
                <div>
                    <select className={'w-1/3'} id={'select'}>
                        <option>
                            
                        </option>
                        <option>
                            option
                        </option>
                    </select>
                    <input type={'text'} placeholder={'title'}/>
                </div>
            </form>

        </main>
    )
}