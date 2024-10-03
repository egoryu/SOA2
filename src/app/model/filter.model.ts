import { PersonModel } from "./person.model";

export type SerchParams = Partial<PersonModel>;
export type SortType = 'ASC' | 'DESC';

export interface ILocationSort {
    x?: SortType;
    y?: SortType;
    name?: SortType;
}

export interface ICoordinatesSort {
    x?: SortType;
    y?: SortType;
}

export interface SortParams {
    id?: SortType;
    creationDate?: SortType;
    name?: SortType;
    coordinates?: ICoordinatesSort;
    height?: SortType;
    eyeColor?: SortType;
    hairColor?: SortType;
    nationality?: SortType;
    location?: ILocationSort;
}

export interface FilterParams {
    offset: number;
    limit: number;
    sort?: SortParams;
    filter?: SerchParams;
}