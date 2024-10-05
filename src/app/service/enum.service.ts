import { Injectable } from '@angular/core';
import {Filter} from '../model/filter.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    public countryEnum = new BehaviorSubject<Filter[] | null>(null);
    public colorEnum = new BehaviorSubject<Filter[] | null>(null);

    constructor() { }
}
