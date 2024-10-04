import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    public errors = new BehaviorSubject<HttpErrorResponse | null>(null);

    constructor() { }
}
