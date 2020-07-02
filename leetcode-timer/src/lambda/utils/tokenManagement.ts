import {decode, sign} from 'jsonwebtoken';
import {privateKey} from "./exportConfig";

const tokenUpdateDeltaInSecs = 60;
const tokenTimeout = '2m';
const tokenEncryptionAlgorithm = 'RS256';


let getUpdatedToken = (authHeader: string, delta: number): string => {
    let token = authHeader.split(' ')[1];
    let jwt = decode(token, {complete: true});
    let tokenExpiryTime = jwt.payload.exp;
    let currentTimeInEpoch: number = Math.floor(new Date().getTime() / 1000);
    if (tokenExpiryTime - currentTimeInEpoch <= delta) {
        console.log("Token updated")
        return sign({sub: jwt.payload.sub}, privateKey, JWTSignOptions)
    } else {
        return token;
    }
}
const JWTSignOptions = {
    algorithm: tokenEncryptionAlgorithm,
    expiresIn: tokenTimeout
}

export {
    tokenEncryptionAlgorithm,
    JWTSignOptions,
    getUpdatedToken,
    tokenUpdateDeltaInSecs
}
