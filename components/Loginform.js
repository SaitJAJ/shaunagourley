'use client'


import {useRef} from "react";

export default function Loginform(){
    const formRef=useRef()
    const submit=async () => {
        let formData = new FormData(formRef.current)
        let res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/account/login", {method: "POST", body: formData})
    }

    return(
        <div className={'flex justify-center items-center h-screen bg-green-200 '}>
            <form ref={formRef} onSubmit={submit} className={'grid w-1/2'}>
                <input required type={'text'} id={'email'} name={'email'} className={'text-xl h-[2lh] p-[.4lh] m-[.4lh] bg-green-200 '} placeholder={'Email'} />
                <input required type={'password'} id={'password'} name={'password'} className={'text-xl h-[2lh] p-[.4lh] mx-[.4lh] my-[.1lh] bg-green-200'} placeholder={'Enter your password'} />
                <input required type={'password'} id={'confPassword'} name={'confPassword'} className={'text-xl h-[2lh] p-[.4lh] mx-[.4lh] my-[.1lh] bg-green-200'} placeholder={'Confirm your password'} />
                <input required type={'submit'} className={'h-[1.5lh] text-2xl hover:bg-yellow-200 my-[.1lh]'} value={'Sign in'}/>
            </form>
        </div>
    )
}