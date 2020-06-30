
const tokenTimeout = '2m';
const tokenEncryptionAlgorithm = 'RS256';
const JWTSignOptions = {
    algorithm: tokenEncryptionAlgorithm,
    expiresIn: tokenTimeout
}

function errorInPut(entityName: string): string {
    return "Unable to add " + entityName + " in the database. Please try again"
}

export {
    errorInPut,
    tokenTimeout,
    tokenEncryptionAlgorithm,
    JWTSignOptions
}
