import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_URL } from "../consts";
import { Observable, share } from "rxjs";
import {EnumResponseModel} from '../model/response.model';

@Injectable({
    providedIn: 'root'
})
export class InitializeService {
    constructor(private http: HttpClient) {
    }

    public getColorEnum$(): Observable<EnumResponseModel> {
        return this.http.get<EnumResponseModel>(`${SERVER_URL}/color`).pipe(
            share()
        )
    }

    public getCountryEnum$(): Observable<EnumResponseModel> {
        return this.http.get<EnumResponseModel>(`${SERVER_URL}/country`).pipe(
            share()
        )
    }
}
