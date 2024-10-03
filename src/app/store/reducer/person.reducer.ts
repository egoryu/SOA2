import { createReducer, on } from "@ngrx/store";
import { PersonModel } from "../../model/person.model";
import {getPersonByIdSuccess} from '../action/person.action';

export const initialPersonState: PersonModel[] = [];

export const PersonReducer = createReducer(
    initialPersonState,
    on(getPersonByIdSuccess, (state, {person}) => [...state, person]),
)
