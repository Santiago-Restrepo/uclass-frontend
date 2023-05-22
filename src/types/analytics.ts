export interface ITeacherReviewsCount {
    count: number;
    teacher: {
        _id: string;
        name: string;
    }
}
export interface IReviewsCount {
    count: number;
    date: string;
}

export interface ITeachersReviewsRatingCount {
    clarity: number;
    demanding: number;
    fairness: number;
    teacher: {
        _id: string;
        name: string;
    }
}

export interface ITeachersReviewsCommentsCount {
    count: number;
    teacher: {
        _id: string;
        name: string;
    }
}
