import { User } from "./user";
import {Subject} from "./subject";
export interface Resource {
    _id: number;
    name: string;
    description: string;
    subject: number | Subject;
    user: number | User;
    resourceUrl: string;
    imgUrl: string;
    rating: number;
    ratingCount: number;
}
