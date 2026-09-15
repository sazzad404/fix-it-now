
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


const verifyToken = (token:string, secret: string)=>{
    try {
        const verify = jwt.verify(token, secret)
        return{
            success: true,
            data: verify
        }
    } catch (error: any) {
        console.log(`Token verification failed ${error}`)
      
    }
}
export const jwtUtils = {

    verifyToken
}