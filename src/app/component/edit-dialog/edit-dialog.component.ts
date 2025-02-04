import {Component, EventEmitter, input, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Color, Country, PersonModel} from '../../model/person.model';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {Filter} from '../../model/filter.model';
import {EnumService} from '../../service/enum.service';
import {numberValidator, person} from '../../consts';

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
        name: [`${this.person?.name || ''}`, [Validators.required]],
        creationDate: `${this.person?.creationDate || '' }`,
        eyeColor: new FormControl<Filter>({name: this.person?.eyeColor, value: this.person?.eyeColor} || {}, [Validators.required]),
        hairColor: new FormControl<Filter>({name: this.person?.hairColor, value: this.person?.hairColor} || {}, [Validators.required]),
        height: [`${this.person?.height === undefined ? '' : this.person?.height}`, [Validators.required, numberValidator()]],
        nationality: new FormControl<Filter>({name: this.person?.nationality!, value: this.person?.nationality!} || {}, [Validators.required]),
        "coordinates.x": [`${this.person?.coordinates.x === undefined ? '' : this.person?.coordinates.x}`, [numberValidator()]],
        "coordinates.y": [`${this.person?.coordinates.y === undefined ? '' : this.person?.coordinates.y}`, [numberValidator()]],
        "location.name": `${this.person?.location?.name || ''}`,
        "location.x": [`${this.person?.location?.x === undefined ? '' : this.person?.location?.x}`, [numberValidator()]],
        "location.y": [`${this.person?.location?.y === undefined ? '' : this.person?.location?.y}`, [numberValidator()]],
    });

    public colorEnum?: Filter[];
    public countryEnum?: Filter[];

    constructor(private fb: FormBuilder, private enumService: EnumService) {
        this.enumService.countryEnum.subscribe({
            next: data => this.countryEnum = data!
        });
        this.enumService.colorEnum.subscribe({
            next: data => this.colorEnum = data!
        });
    }

    public  ngOnChanges(changes: SimpleChanges): void {
        if (changes['person']) {
            this.personForm = this.fb.group({
                id: `${this.person?.id || ''}`,
                name: [`${this.person?.name || ''}`, [Validators.required]],
                creationDate: `${this.person?.creationDate || '' }`,
                eyeColor: new FormControl<Filter>({name: this.person?.eyeColor, value: this.person?.eyeColor} || {}, [Validators.required]),
                hairColor: new FormControl<Filter>({name: this.person?.hairColor, value: this.person?.hairColor} || {}, [Validators.required]),
                height: [`${this.person?.height === undefined ? '' : this.person?.height}`, [Validators.required, numberValidator()]],
                nationality: new FormControl<Filter>({name: this.person?.nationality!, value: this.person?.nationality!} || {}, [Validators.required]),
                "coordinates.x": [`${this.person?.coordinates.x === undefined ? '' : this.person?.coordinates.x}`, [numberValidator()]],
                "coordinates.y": [`${this.person?.coordinates.y === undefined ? '' : this.person?.coordinates.y}`, [numberValidator()]],
                "location.name": `${this.person?.location?.name || ''}`,
                "location.x": [`${this.person?.location?.x === undefined ? '' : this.person?.location?.x}`, [numberValidator()]],
                "location.y": [`${this.person?.location?.y === undefined ? '' : this.person?.location?.y}`, [numberValidator()]],
            });

            this.personForm.controls.id.disable();
            this.personForm.controls.creationDate.disable();
        }
    }

    public clickUpdatePerson(mode: number): void {
        const personData: PersonModel = {
            id: Number.parseFloat(this.personForm.controls.id.value!),
            name: this.personForm.controls.name.value!,
            creationDate: this.personForm.controls.creationDate.value!,
            eyeColor: this.personForm.controls.eyeColor.value?.value as Color,
            hairColor: this.personForm.controls.hairColor.value?.value as Color,
            height: Number.parseFloat(this.personForm.controls.height.value!),
            nationality: this.personForm.controls["nationality"].value?.value as Country,
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

    public clickCancel(): void {
        this.changeEditData.emit({data: person, mode: 0});
    }
}
