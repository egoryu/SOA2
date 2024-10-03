import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Color, Country, PersonModel, PersonRequestModel} from "../model/person.model";
import {SERVER_PEOPLE_URL} from "../consts";
import {share} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {CountResponseModel} from "../model/response.model";

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    constructor(private http: HttpClient) {
    }

    public postPerson$(person: PersonRequestModel): Observable<PersonModel> {
        return this.http.post<PersonModel>(`${SERVER_PEOPLE_URL}`, person).pipe(
            share()
        )
    }

    public getPeople$(params: HttpParams): Observable<PersonModel[]> {
        return this.http.get<PersonModel[]>(`${SERVER_PEOPLE_URL}`, {params}).pipe(
            share()
        )
    }

    public getPerson$(id: number): Observable<PersonModel> {
        const person: PersonModel = {
            id: id,
            name: "John Doe",
            coordinates: { x: 12.34, y: 56.78 },
            height: 175,
            eyeColor: Color.BLACK,
            hairColor: Color.BLACK,
            nationality: Country.GERMANY,
            location: { x: 0, y: 0, name: 'kek' },
            creationDate: ''
        } as PersonModel;

        return of(person);
        /*return this.http.get<PersonModel>(`${SERVER_PEOPLE_URL}/${id}`).pipe(
            share()
        )*/
    }

    public putPerson$(id: string, person: PersonModel): Observable<unknown> {
        return this.http.put(`${SERVER_PEOPLE_URL}/${id}`, person).pipe(
            share()
        )
    }

    public patchPerson$(id: string, person: PersonModel): Observable<unknown> {
        return this.http.patch(`${SERVER_PEOPLE_URL}/${id}`, person).pipe(
            share()
        )
    }

    public deletePerson$(id: string): Observable<unknown> {
        return this.http.delete(`${SERVER_PEOPLE_URL}/${id}`).pipe(
            share()
        )
    }

    public resolveOperation$(func: string, height: number): Observable<CountResponseModel> {
        return this.http.get<CountResponseModel>(`${SERVER_PEOPLE_URL}/${func}/height`, {params: {height}}).pipe(
            share()
        )
    }
}
