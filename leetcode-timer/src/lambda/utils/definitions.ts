import {APIGatewayProxyResult} from 'aws-lambda';

const emailAlreadyExists = " Given email address already exists: ";
const tokenTimeout = '1m';
const tokenEncryptionAlgorithm = 'RS256';
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBANwPK+4q2Cr/A5PdQ5VqX5+Yfouko9Uh/h7R+Rf7yEgzPgLKVwyD
LLKXJDb+7yT7r3nAY8D2MG4T8AvFr6Dq6pECAwEAAQJAbdi86xRD96J4XLUUaV9C
AF6UvIwgo+FmAmh52Pj8Dt1oXsQFH0ZpbmzIlp3cUOpFsljjty3T4ma6nasMh2bc
CQIhAO5m+LFlTIB41l8O8PLrDsrjGig69EvWGuTm18mnamFbAiEA7E2T2894lp73
CgZO2bnRq+F8odkJ1dFH/mrEB+rrm4MCIQDDTKe+63VYaaV0ChFpbxaXLqRnAKTQ
23z8t/9euz9ysQIgbcuh/wlIe5vDJ1pE+u9XF+j+kukYo8vJCtKq4Q7riGcCIQDQ
YAw3zaSRnilw1X1pybUGMRdm/regfNrN3PF7+vVT0A==
-----END RSA PRIVATE KEY-----`

function emailUsed(email: string): APIGatewayProxyResult {
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: emailAlreadyExists + email
        })
    }
}

const JWTSignOptions = {
    algorithm: tokenEncryptionAlgorithm,
    expiresIn: tokenTimeout
}

export {
    emailUsed,
    tokenTimeout,
    tokenEncryptionAlgorithm,
    privateKey,
    JWTSignOptions
}
