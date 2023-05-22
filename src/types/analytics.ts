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

//Resources and subjects
export interface IResourcesCount { //Same as IReviewsCount
    count: number;
    date: string;
}

export interface ISubjectResourcesCount {
    count: number;
    subject:{
        _id: string;
        name: string;
    }
}

export interface ISubjectResourcesRatingCount {
    rating: number;
    subject:{
        _id: string;
        name: string;
    }
}