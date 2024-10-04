import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Color, Country, PersonModel, PersonRequestModel} from "../model/person.model";
import {person, SERVER_PEOPLE_URL} from "../consts";
import {share} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {CountResponseModel, PeopleResponseModel} from "../model/response.model";

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

    public getPeople$(params: HttpParams): Observable<PeopleResponseModel> {
        //return of([person, person])
        return this.http.get<PeopleResponseModel>(`${SERVER_PEOPLE_URL}`, {params}).pipe(
            share()
        )
    }

    public getPerson$(id: number): Observable<PersonModel> {
        //return of(person);
        return this.http.get<PersonModel>(`${SERVER_PEOPLE_URL}/${id}`).pipe(
            share()
        )
    }

    public putPerson$(id: number, person: PersonModel): Observable<unknown> {
        return this.http.put(`${SERVER_PEOPLE_URL}/${id}`, person).pipe(
            share()
        )
    }

    public patchPerson$(id: number, person: PersonModel): Observable<unknown> {
        return this.http.patch(`${SERVER_PEOPLE_URL}/${id}`, person).pipe(
            share()
        )
    }

    public deletePerson$(id: number): Observable<unknown> {
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
