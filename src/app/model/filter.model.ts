import { PersonModel } from "./person.model";

export type SortType = 'ASC' | 'DESC';

export interface Filter {
    name: string,
    value: string
}

export interface SortParams {
    id?: SortType;
    creationDate?: SortType;
    name?: SortType;
    "coordinates.x"?: SortType;
    "coordinates.y"?: SortType;
    height?: SortType;
    eyeColor?: SortType;
    hairColor?: SortType;
    nationality?: SortType;
    "location.name"?: SortType;
    "location.x"?: SortType;
    "location.y"?: SortType;
}

export interface SearchParams {
    id?: string;
    creationDate?: string;
    name?: string;
    "coordinates.x"?: string;
    "coordinates.y"?: string;
    height?: string;
    eyeColor?: string;
    hairColor?: string;
    nationality?: string;
    "location.name"?: string;
    "location.x"?: string;
    "location.y"?: string;
}

export interface FilterParams {
    offset: number;
    limit: number;
    sort?: SortParams;
    filter?: SearchParams;
}
