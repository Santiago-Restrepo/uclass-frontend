import {Teacher} from './teacher';
export interface Subject{
    _id: string;
    name: string;
    description: string;
    teacher: string | Teacher;
}