export type DropdownItem = {
    id: string,
    text: string,
    onClick?: () => any;
}

export interface User {
    avatar?: string,
    id?: string,
    _id?: string,
    fullName?: string,
    email?: string,
    password?: string,
    rePassword?: string,
}

export interface Post extends User {
    content: string,
    _id: string,
    userId: string,
}