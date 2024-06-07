import { decryptData, encryptData } from "./crypto/encryption";
import {SignJWT, jwtVerify, jwtDecrypt} from 'jose';
import { cookies } from "next/headers";
export const runtime = 'edge'
export async function setJwt(jwtContent) {
  try {
    let encData = await encryptData(JSON.stringify(jwtContent));
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60* 60; // one hour
    let jwt = await new SignJWT({encData:encData})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
    cookies().set("jwtoken", jwt, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60*60,
    });


    // let token = await jwt.sign({ encData: encData }, process.env.JWT_SECRET, {
    //   expiresIn: 25 * 60,
    // });
    // cookies().set("jwtoken", token, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 60 * 60,
    // });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function testJwtCookie(cookie) {
  try {
    const tokenData = await jwtVerify(cookie.value,new TextEncoder().encode(process.env.JWT_SECRET),{});
    let tokenValues = JSON.parse(await decryptData(tokenData.payload.encData));
    return true;
  } catch (error) {
    console.error(error);
    await deleteJwt();
    return false;
  }
}
export async function getJwtData(cookie) {
  try {
    const tokenData = await jwtVerify(cookie.value,new TextEncoder().encode(process.env.JWT_SECRET),{});
    let tokenValues = await decryptData(tokenData.payload.encData);
    console.log(tokenData)
    return JSON.parse(tokenValues);
  } catch (error) {
    console.error(error);
    await deleteJwt();
  }
}

export async function getJwt(cookie) {
  try {
    const tokenData = await jwtVerify(cookie.value,new TextEncoder().encode(process.env.JWT_SECRET),{});
    let tokenValues = await decryptData(tokenData.payload.encData);
    return {
      data: JSON.parse(tokenValues),
      iat: tokenData.iat,
      exp: tokenData.exp,
    };
  } catch (error) {
    return {};
  }
}
export async function deleteJwt() {
  try {
    cookies().delete("jwtoken");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
