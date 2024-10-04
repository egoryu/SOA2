import { Component, Input, OnInit } from '@angular/core';
import { PersonModel } from '../../model/person.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-person',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './person.component.html',
    styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit {
    @Input({required: true}) public person?: PersonModel;

    constructor() {}

    public ngOnInit(): void {

    }

    protected readonly Object = Object;
}
