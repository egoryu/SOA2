import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_DEMOGRAPHY_URL } from "../consts";
import { CountResponseModel } from "../model/response.model";
import { Observable, share } from "rxjs";
import { Color, Country } from "../model/person.model";

@Injectable({
    providedIn: 'root'
})
export class DemographyService {
    constructor(private http: HttpClient) {
    }

    public getHairColorPercentage$(hairColor: Color): Observable<CountResponseModel> {
        return this.http.get<CountResponseModel>(`${SERVER_DEMOGRAPHY_URL}/hair-color/${hairColor}/percentage`).pipe(
            share()
        )
    }

    public getNationalitePeopleCountByHairColor$(nationality: Country, hairColor: Color): Observable<CountResponseModel> {
        return this.http.get<CountResponseModel>(`${SERVER_DEMOGRAPHY_URL}/nationality/${nationality}/hair-color`, {params: {"hair-color": hairColor}}).pipe(
            share()
        )
    }
}