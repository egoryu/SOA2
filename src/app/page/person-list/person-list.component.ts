import {Component, OnInit} from '@angular/core';
import {PersonModel} from '../../model/person.model';
import {PersonService} from '../../service/person.service';
import {HttpParams} from '@angular/common/http';
import {PersonComponent} from '../../component/person/person.component';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [
        PersonComponent
    ],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit {
    public people?: PersonModel[];

    constructor(
        private personService: PersonService
    ) {
    }

    public ngOnInit(): void {
        this.requestPeople();
    }

    private requestPeople(): void {
        this.personService.getPeople$(new HttpParams())
            .subscribe({
                next: (people: PersonModel[]) => {
                    this.people = people;
                }
            })
    }
}
