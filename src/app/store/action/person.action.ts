import {createAction, props} from "@ngrx/store";
import { PersonModel } from "../../model/person.model";

export const getPersonById = createAction('[Person] Get person by id', props<{id: number}>())
export const getPersonByIdSuccess = createAction('[Person] Get person by id Success', props<{person: PersonModel}>())
export const getPersonByIdFailed = createAction('[Person] Get person by id Failed', props<{message: string}>())
