const privateKey: string = process.env.privateKey;
const publicKey: string = process.env.publicKey;
const createToken: string = process.env.createToken;
const usersTable: string = process.env.USERS_TABLE;
const solvesTable: string = process.env.SOLVES_TABLE;

export {
    privateKey,
    publicKey,
    createToken,
    usersTable,
    solvesTable
}
