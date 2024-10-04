import { Component } from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {Filter} from '../../model/filter.model';
import {Button} from 'primeng/button';
import {PersonService} from '../../service/person.service';
import {CountResponseModel} from '../../model/response.model';
import {DemographyService} from '../../service/demograhy.service';
import {EnumService} from '../../service/enum.service';
import {Color, Country} from '../../model/person.model';

@Component({
  selector: 'app-person-statistic',
  standalone: true,
    imports: [
        DropdownModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        Button
    ],
  templateUrl: './person-statistic.component.html',
  styleUrl: './person-statistic.component.scss'
})
export class PersonStatisticComponent {
    public modes = [
        {name: 'Average of all', value: 'average'},
        {name: 'Count by height', value: 'count'}
    ];
    public heightForm = this.fb.group({
        mode: new FormControl<Filter>(this.modes[0], [Validators.required]),
        height: ['', [Validators.required]],
    })
    public result?: number;

    public demographyModes = [
        {name: 'Get percentage of hair color', value: 'percentage'},
        {name: 'Get count of nationality by hair color', value: 'count'}
    ];
    public demographyForm = this.fb.group({
        mode: new FormControl<Filter>(this.demographyModes[0], [Validators.required]),
        hairColor: new FormControl<Color | null>(null, [Validators.required]),
        nationality: new FormControl<Country | null>(null, [Validators.required])
    })
    public colorEnum: Filter[];
    public countryEnum: Filter[];
    public resultDemography?: number;

    constructor(private fb: FormBuilder, private personService: PersonService, private demographyService: DemographyService, private enumService: EnumService) {
        this.countryEnum = this.enumService.countryEnum;
        this.colorEnum = this.enumService.colorEnum;
    }

    public clickResolveHeight() {
        this.personService.resolveOperation$(this.heightForm.controls['mode'].value?.value!, Number.parseFloat(this.heightForm.controls['height'].value!) || undefined)
            .subscribe({
                next: (data: CountResponseModel) => this.result = data.value
            });
    }

    public clickResolveDemography(): void {
        if (this.demographyForm.controls['mode'].value?.value === 'count') {
            this.demographyService.getNationalitePeopleCountByHairColor$(this.demographyForm.controls.nationality.value!, this.demographyForm.controls.hairColor.value!)
                .subscribe({
                    next: (data: CountResponseModel) => this.resultDemography = data.value
                })
        } else {
            this.demographyService.getHairColorPercentage$(this.demographyForm.controls.hairColor.value!)
                .subscribe({
                    next: (data: CountResponseModel) => this.resultDemography = data.value
                })
        }
    }
}
