import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {PersonService} from '../../service/person.service';
import {getPersonById, getPersonByIdFailed, getPersonByIdSuccess} from '../action/person.action';

@Injectable()
export class PersonEffects {

    loadPerson$ = createEffect(
        () => this.actions$.pipe(
                ofType(getPersonById),
                mergeMap((action) =>
                    this.personService.getPerson$(action.id).pipe(
                        map((person) => getPersonByIdSuccess({person})),
                        catchError(error => of(getPersonByIdFailed({ message: error.message })))
                    )
                )
            )

    );

    /*
    * return this.actions$.pipe(
                ofType(PersonActions.getPersonById),
                mergeMap(({id}) =>
                    this.personService.getPerson$(id).pipe(
                        map((person: PersonModel) => PersonAPIActions.getPersonByIdSuccess({person})),
                        catchError(error => of(PersonAPIActions.getPersonByIdFailed({message: error.message})))
                    )
                )
            )
    * */
    constructor(
        private actions$: Actions,
        private personService: PersonService
    ) {
        console.log('actions$')
    }
}
