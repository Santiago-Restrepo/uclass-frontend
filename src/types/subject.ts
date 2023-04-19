import {Teacher} from './teacher';
export interface Subject{
    _id: number;
    name: string;
    description: string;
    teacher: string | Teacher;
}