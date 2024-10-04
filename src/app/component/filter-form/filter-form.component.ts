import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {person} from '../../consts';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {FilterParams, SearchParams, SortParams} from '../../model/filter.model';
import {PersonModel} from '../../model/person.model';
import {ChipModule} from 'primeng/chip';
import {NgForOf} from '@angular/common';

interface Filter {
    name: string,
    value: string
}
@Component({
  selector: 'app-filter-form',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        DropdownModule,
        InputTextModule,
        Button,
        ChipModule,
        NgForOf
    ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent {
    @Output() public changeFilter = new EventEmitter<FilterParams>();

    public modes = [
        {name: 'Identical', value: '='},
        {name: 'Greater', value: '>'},
        {name: 'Greater or Equal', value: '>='},
        {name: 'Less', value: '<'},
        {name: 'Less or Equal', value: '<='},
        {name: 'Substring', value: '~'},
    ];
    public order = [
        {name: 'ascending', value: 'asc'},
        {name: 'descending', value: 'desc'},
    ];
    public filters = [
        {"name": "id", "value": "id"},
        {"name": "name", "value": "name"},
        {"name": "coordinates - x", "value": "coordinates.x"},
        {"name": "coordinates - y", "value": "coordinates.y"},
        {"name": "height", "value": "height"},
        {"name": "eyeColor", "value": "eyeColor"},
        {"name": "hairColor", "value": "hairColor"},
        {"name": "nationality", "value": "nationality"},
        {"name": "location - name", "value": "location.name"},
        {"name": "location - x", "value": "location.x"},
        {"name": "location - y", "value": "location.y"},
        {"name": "creationDate", "value": "creationDate"}
    ];

    public filterForm = this.fb.group({
        param: new FormControl<Filter | null>(this.filters[0], [Validators.required]),
        text: new FormControl<string>('', [Validators.required]),
        mode: new FormControl<Filter>(this.modes[0], [Validators.required])
    });
    public sortForm = this.fb.group({
        sortBy: new FormControl<Filter | null>(this.filters[0], [Validators.required]),
        order: new FormControl<Filter | null>(this.order[0], [Validators.required])
    })
    public searchParams: SearchParams = {};
    public sortParams: SortParams = {};
    public filterTags: string[] = [];
    public sortTags: string[] = []


    constructor(private fb: FormBuilder) {
    }

    public clickAddFilter(): void {
        if (this.filterForm.controls['param'].value?.value) {
            // @ts-ignore
            this.searchParams[this.filterForm.controls['param'].value?.value] = this.filterForm.controls['mode'].value?.value! + this.filterForm.controls['text'].value;
            this.filterForm.controls['text'].reset();
            this.updateFilterTags();
        }
    }

    private updateFilterTags(): void {
        this.filterTags = [];
        this.filterTags = Object.entries(this.searchParams).reduce((cur, val) => [...cur, val[0] + ':' + val[1]], new Array<string>());
    }

    public onRemoveFilterTag(value: string): void {
        // @ts-ignore
        delete this.searchParams[value.split(':')[0]];
        this.updateFilterTags();
    }

    public clickAddSort(): void {
        if (this.sortForm.controls['sortBy'].value?.value) {
            // @ts-ignore
            this.sortParams[this.sortForm.controls['sortBy'].value?.value] = this.sortForm.controls['order'].value?.value;
            this.updateSortTags();
        }
    }
    private updateSortTags(): void {
        this.sortTags = [];
        this.sortTags = Object.entries(this.sortParams).reduce((cur, val) => [...cur, val[0] + ':' + val[1]], new Array<string>());
    }

    public onRemoveSortTag(value: string): void {
        // @ts-ignore
        delete this.sortParams[value.split(':')[0]];
        this.updateSortTags();
    }

    public clickFind(): void {
        this.changeFilter.emit({
            sort: this.sortParams,
            filter: this.searchParams
        } as FilterParams);
    }
}
