import { Injectable } from '@angular/core';
import {Filter} from '../model/filter.model';

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    public countryEnum!: Filter[];
    public colorEnum!: Filter[];

    constructor() { }
}
