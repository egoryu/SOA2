import {Component, EventEmitter, input, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Color, Country, PersonModel} from '../../model/person.model';
import {FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {Filter} from '../../model/filter.model';
import {EnumService} from '../../service/enum.service';

export interface EditData {
    data: PersonModel,
    mode: number
}

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        Button,
        DialogModule,
        DropdownModule
    ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent implements OnChanges {
    @Input() public person!: PersonModel;
    @Input() public visible: boolean = true;
    @Output() public changeEditData = new EventEmitter<EditData>();

    public personForm = this.fb.group({
        id: `${this.person?.id || ''}`,
        name: `${this.person?.name || ''}`,
        creationDate: `${this.person?.creationDate || '' }`,
        eyeColor: new FormControl<Color>(this.person?.eyeColor || ''),
        hairColor: new FormControl<Color>(this.person?.hairColor || ''),
        height: `${this.person?.height === undefined ? '' : this.person?.height}`,
        nationality: new FormControl<Country | undefined>(this.person?.nationality || undefined),
        "coordinates.x": `${this.person?.coordinates.x === undefined ? '' : this.person?.coordinates.x}`,
        "coordinates.y": `${this.person?.coordinates.y === undefined ? '' : this.person?.coordinates.y}`,
        "location.name": `${this.person?.location?.name || ''}`,
        "location.x": `${this.person?.location?.x === undefined ? '' : this.person?.location?.x}`,
        "location.y": `${this.person?.location?.y === undefined ? '' : this.person?.location?.y}`,
    });

    public colorEnum: Filter[];
    public countryEnum: Filter[];

    constructor(private fb: FormBuilder, private enumService: EnumService) {
        this.countryEnum = this.enumService.countryEnum;
        this.colorEnum = this.enumService.colorEnum;
    }

    public  ngOnChanges(changes: SimpleChanges): void {
        if (changes['person']) {
            this.personForm = this.fb.group({
                id: `${this.person?.id || ''}`,
                name: `${this.person?.name || ''}`,
                creationDate: `${this.person?.creationDate || '' }`,
                eyeColor: new FormControl<Color>(this.person?.eyeColor || ''),
                hairColor: new FormControl<Color>(this.person?.hairColor || ''),
                height: `${this.person?.height === undefined ? '' : this.person?.height}`,
                nationality: new FormControl<Country | undefined>(this.person?.nationality || undefined),
                "coordinates.x": `${this.person?.coordinates.x === undefined ? '' : this.person?.coordinates.x}`,
                "coordinates.y": `${this.person?.coordinates.y === undefined ? '' : this.person?.coordinates.y}`,
                "location.name": `${this.person?.location?.name || ''}`,
                "location.x": `${this.person?.location?.x === undefined ? '' : this.person?.location?.x}`,
                "location.y": `${this.person?.location?.y === undefined ? '' : this.person?.location?.y}`,
            });
        }
    }

    public clickUpdatePerson(mode: number): void {
        const personData: PersonModel = {
            id: Number.parseFloat(this.personForm.controls.id.value!),
            name: this.personForm.controls.name.value!,
            creationDate: this.personForm.controls.creationDate.value!,
            eyeColor: this.personForm.controls.eyeColor.value as Color,
            hairColor: this.personForm.controls.hairColor.value as Color,
            height: Number.parseFloat(this.personForm.controls.height.value!),
            nationality: this.personForm.controls.nationality.value as Country,
            coordinates: {
                x: Number.parseFloat(this.personForm.controls["coordinates.x"].value!),
                y: Number.parseFloat(this.personForm.controls["coordinates.y"].value!)
            },
            location: {
                name: this.personForm.controls["location.name"].value!,
                x: Number.parseFloat(this.personForm.controls["location.x"].value!),
                y: Number.parseFloat(this.personForm.controls["location.y"].value!)
            }
        }

        this.changeEditData.emit({data: personData, mode: mode});
    }
}
