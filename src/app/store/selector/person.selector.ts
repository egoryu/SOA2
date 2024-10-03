import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PersonModel } from "../../model/person.model";

export const selectPeople = createFeatureSelector<PersonModel[]>('person');

export const selectAllPeople = createSelector(selectPeople, (people) => people);