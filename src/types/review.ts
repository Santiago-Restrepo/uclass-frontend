import { User } from "./user";
import { Subject } from "./subject";
export interface Review {
    _id?: string;
    content: string;
    subject: string | Subject;
    teacherId: string;
    user?: User | string;
    rating: {
        clarity: number;
        demanding: number;
        fairness: number;
    };
    parentReviewId?: string;
    originalReviewId?: string;
    isApproved?: boolean;
    isDeleted?: boolean;
    isRejected?: boolean;
    rejectedReason?: string;
    isEdited?: boolean;
    createdAt: string;
}