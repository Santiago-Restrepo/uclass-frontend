import { User } from "./user";
export interface Resource {
    _id: number;
    name: string;
    description: string;
    subject: number;
    user: number | User;
    resourceUrl: string;
    imgUrl: string;
    rating: number;
}