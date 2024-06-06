const { NODE_ENV, SECRET_KEY} = process.env
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'
let config;
if( process.env.SECRET_KEY !== undefined){
    config = {
        env: NODE_ENV,
        secret_key: SECRET_KEY,
    }
}else{
    console.log(getRequestContext().env["NODE_ENV"])
    config={
        env: getRequestContext().env["NODE_ENV"],
        secret_key: getRequestContext().env["SECRET_KEY"],
    }
}
export default config;
