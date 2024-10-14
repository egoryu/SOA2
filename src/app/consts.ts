import {Color, Country, PersonModel} from './model/person.model';
import {AbstractControl, ValidatorFn} from '@angular/forms';

/*
export const SERVER_PEOPLE_URL = 'https://virtserver.swaggerhub.com/EgorNikitin/SOA1/1.0.0/people'
export const SERVER_DEMOGRAPHY_URL = 'https://virtserver.swaggerhub.com/EgorNikitin/SOA1-demography/1.0.0/demography'
export const SERVER_URL = 'https://virtserver.swaggerhub.com/EgorNikitin/SOA1/1.0.0'*/
export const SERVER_PEOPLE_URL = 'https://localhost:8082/people'
export const SERVER_DEMOGRAPHY_URL = 'https://localhost:8082/demography'
export const SERVER_URL = 'https://localhost:8081'

export const person: PersonModel = {
    id: 10,
    name: "John Doe",
    coordinates: { x: 12.34, y: 56.78 },
    height: 175,
    eyeColor: Color.BLACK,
    hairColor: Color.BLACK,
    nationality: Country.GERMANY,
    location: { x: 10, y: -20, name: 'kek' },
    creationDate: '14.01.2003'
} as PersonModel;

export const numberValidator = (): ValidatorFn => {
    return (
        control: AbstractControl
    ): { [key: string]: boolean } | null => {
        const valid = !control.value || !Number.isNaN(Number(control.value));

        return valid ? null : { number: true };
    };
}
