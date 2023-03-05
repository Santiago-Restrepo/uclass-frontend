export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
}
