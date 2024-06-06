import config from './config'

export const runtime = 'edge'

const {secret_key}=config

if (!secret_key) {
    throw new Error('secretKey, secretIV, and encryptionMethod are required')
}

    // .createHash('sha512')
    // .update(secret_key)
    // .digest('hex')
    // .substring(0,32)
// const encryptionIV=
//     .createHash('sha512')
//     .update(secret_iv)
//     .digest('hex')
//     .substring(0,16)
//Encrypt data

export async function encryptData(data) {
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const key=await crypto.subtle.importKey('raw',Buffer.from(secret_key,"base64"),{
        name: 'AES-GCM',
        length: 256
    },true,['encrypt', 'decrypt'])
    const encodedText = new TextEncoder().encode(data);
    const encryptedText = await crypto.subtle.encrypt({
        name:'AES-GCM',
        iv
    },key,encodedText);
    return(Buffer.from(encryptedText).toString('base64')+"."+Buffer.from(iv).toString('base64'))
}

// Decrypt data
export async function decryptData(encryptedData) {
    let dataArray = encryptedData.split('.');
    let iv = dataArray[1]
    let data = dataArray[0]
    const key=await crypto.subtle.importKey('raw',Buffer.from(secret_key,"base64"),{
        name: 'AES-GCM',
        length: 256
    },true,['encrypt', 'decrypt'])
    const plainText = await crypto.subtle.decrypt({name:'AES-GCM',iv:Buffer.from(iv,"base64")},
        key,Buffer.from(data,"base64"))
    return new TextDecoder().decode(plainText)
}
