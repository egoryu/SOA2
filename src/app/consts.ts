import {Color, Country, PersonModel} from './model/person.model';

export const SERVER_PEOPLE_URL = 'https://localhost:8080/api/v1/people'
export const SERVER_DEMOGRAPHY_URL = 'https://localhost:8080/api/v1/demography'
export const SERVER_URL = 'https://localhost:8080/api/v1'

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
