import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {getPersonById} from '../../store/action/person.action';
import { PersonModel } from '../../model/person.model';
import { selectAllPeople } from '../../store/selector/person.selector';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-person',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './person.component.html',
    styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit {
    public people$!: Observable<PersonModel[]>;

    constructor(private store: Store) {}

    public ngOnInit(): void {
        this.store.dispatch(getPersonById({id: 1}));
        this.people$ = this.store.select(selectAllPeople).pipe(tap(s => console.log(s)));
    }

}
