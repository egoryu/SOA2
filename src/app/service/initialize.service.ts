import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_URL } from "../consts";
import { Observable, share } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class InitializeService {
    constructor(private http: HttpClient) {
    }

    public getColorEnum$(): Observable<unknown> {
        return this.http.get(`${SERVER_URL}/color`).pipe(
            share()
        )
    }

    public getCountryEnum$(): Observable<unknown> {
        return this.http.get(`${SERVER_URL}/country`).pipe(
            share()
        )
    }
}
