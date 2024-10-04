import {Component, OnInit} from '@angular/core';
import {PersonModel} from '../../model/person.model';
import {PersonService} from '../../service/person.service';
import {HttpParams} from '@angular/common/http';
import {PersonComponent} from '../../component/person/person.component';
import {person} from '../../consts';
import {FilterFormComponent} from '../../component/filter-form/filter-form.component';
import {PeopleResponseModel} from '../../model/response.model';
import {FilterParams} from '../../model/filter.model';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {Button} from 'primeng/button';
import {EditData, EditDialogComponent} from '../../component/edit-dialog/edit-dialog.component';
import {noop} from 'rxjs';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [
        PersonComponent,
        FilterFormComponent,
        PaginatorModule,
        Button,
        EditDialogComponent
    ],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit {
    public people?: PersonModel[];
    public total = 0;
    public visible: boolean = false;
    public person?: PersonModel;

    private filters: FilterParams = {offset: 0, limit: 10};

    constructor(
        private personService: PersonService
    ) {
    }

    public ngOnInit(): void {
        this.requestPeople();
    }

    private requestPeople(): void {
        let params = new HttpParams();

        params = params.set('limit', this.filters.limit);
        params = params.set('offset', this.filters.offset);

        if (this.filters.filter) {
            for (const attr of Object.entries(this.filters.filter)) {
                params = params.set(attr[0], attr[1]);
            }
        }

        if (this.filters.sort) {
            for (const attr of Object.entries(this.filters.sort)) {
                params = params.set('sort[' + attr[0] + ']', attr[1]);
            }
        }

        this.personService.getPeople$(params)
            .subscribe({
                next: (response: PeopleResponseModel) => {
                    this.people = response.data;
                    this.total = response.total;
                }
            })
    }

    public changeFilter(filters: FilterParams): void {
        this.filters = {...this.filters, ...filters};
        this.requestPeople();
    }

    public onPageChange(event: PaginatorState): void {
        this.filters.limit = event.rows!;
        this.filters.offset = event.page!;
        this.requestPeople();
    }

    public clickAddPerson(): void {
        this.person = undefined;
        this.visible = true;
    }

    public clickUpdatePerson(event: PersonModel): void {
        this.person = event;
        this.visible = true;
    }

    public changeEditData(data: EditData): void {
        this.visible = false;
        switch (data.mode) {
            case 0:
                return;
            case 1:
                this.personService.postPerson$(data.data)
                    .subscribe({
                        next: (data) => this.requestPeople()
                    });
                return;
            case 2:
                this.personService.deletePerson$(data.data.id).subscribe(noop);
                return;
            case 3:
                this.personService.putPerson$(data.data.id, data.data).subscribe(noop);
                return;
        }
    }
}
