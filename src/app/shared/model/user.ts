
export type userRole = "admin" | "superAdmin" | "buyer"

export interface login {
    email : string,
    message : string,
    token : string,
    userRole : string
}
