import { User } from "./user";

export interface Review {
    content: string;
    subjectId: string;
    teacherId: string;
    user: String | User;
    rating: {
        clarity: number;
        demanding: number;
        fairness: number;
    };
    parentReviewId: string;
    originalReviewId: string;
    isApproved: boolean;
    isDeleted: boolean;
    isEdited: boolean;
}