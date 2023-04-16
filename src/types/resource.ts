export interface Resource {
    _id: number;
    name: string;
    description: string;
    subjectId: number;
    userId: number;
    resourceUrl: string;
    imgUrl: string;
    rating: number;
}