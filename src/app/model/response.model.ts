import {PersonModel} from './person.model';

export class CountResponseModel {
    public value!: number;
}

export class PeopleResponseModel {
    public data!: PersonModel[];
    public total!: number;
}
