export interface UserState {
    token: string;
    name?: string;
    id?: string;
    email?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
    photo?: string;
}
