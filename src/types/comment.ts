import { User } from './user';
export interface Comment {
    _id?: string;
    content: string;
    user: string | User;
    rating?: number;
    reviewId?: string;
    resourceId?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}