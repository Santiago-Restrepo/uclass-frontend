import { User } from "./user";
import {Subject} from "./subject";
export interface Resource {
    _id: string;
    name: string;
    description: string;
    subject: string | Subject;
    user: string | User;
    resourceUrl: string;
    imgUrl: string;
    rating: number;
    ratingCount: number;
}

export interface ResourceInput {
    name: string;
    description: string;
    subject: string | Subject;
    user: string | User;
    resourceUrl: string;
    imgUrl?: string;
}
