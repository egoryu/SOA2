import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { PersonModel } from '../../model/person.model';
import { CommonModule } from '@angular/common';
import {TooltipModule} from 'primeng/tooltip';

@Component({
    selector: 'app-person',
    standalone: true,
    imports: [CommonModule, TooltipModule],
    templateUrl: './person.component.html',
    styleUrl: './person.component.scss'
})
export class PersonComponent implements OnInit {
    @Input({required: true}) public person?: PersonModel;

    constructor(private cdr: ChangeDetectorRef) {}

    public ngOnInit(): void {

    }

    public getHeader(): string {
        return `(${this.person?.id}) ${this.person?.name}`
    }

    public getCreationDate(): string {
        return this.person?.creationDate || '-';
    }

    public getCoordinates(): string {
        return `x - ${this.person?.coordinates?.x}, y - ${this.person?.coordinates?.y}`;
    }

    public getLocation(): string {
        return `x - ${this.person?.location?.x}, y - ${this.person?.location?.y}`;
    }
}
