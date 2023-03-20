import {IconType} from 'react-icons';

export interface SearcherState {
    searchers: Searcher[];
    activeSearcher: String | null;
}

export interface Searcher {
    title: string;
    placeholder: string;
    Icon: IconType;
    iconColor: string;
    query: string;
}