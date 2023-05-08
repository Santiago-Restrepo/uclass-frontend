export interface Comment {
    _id?: string;
    content: string;
    userId: string;
    reviewId?: string;
    resourceId?: string;
    isDeleted?: boolean;
}