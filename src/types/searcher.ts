export interface SearcherState {
    searchers: Searcher[];
    activeSearcher: String | null;
}

export interface Searcher {
    title: string;
    placeholder: string;
    apiPath: string;
    appPath: string;
    iconName: IconName;
    iconColor: string;
    query: string;
}

export enum IconName {
    teacher = 'FaChalkboardTeacher',
    subject = 'BsBook'
}