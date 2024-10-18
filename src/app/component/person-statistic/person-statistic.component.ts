import { Component } from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {Filter} from '../../model/filter.model';
import {Button} from 'primeng/button';
import {PersonService} from '../../service/person.service';
import {CountResponseModel} from '../../model/response.model';
import {DemographyService} from '../../service/demograhy.service';
import {EnumService} from '../../service/enum.service';
import {Color, Country} from '../../model/person.model';
import {ChartModule} from 'primeng/chart';
import {MultiSelectModule} from 'primeng/multiselect';
import {EMPTY, forkJoin} from 'rxjs';
import {numberValidator} from '../../consts';

@Component({
  selector: 'app-person-statistic',
  standalone: true,
    imports: [
        DropdownModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        Button,
        ChartModule,
        MultiSelectModule
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
        height: ['', [Validators.required, numberValidator()]],
    })
    public result?: number;

    public demographyModes = [
        {name: 'Get percentage of hair color', value: 'percentage'},
        {name: 'Get count of nationality by hair color', value: 'count'}
    ];
    public demographyForm = this.fb.group({
        mode: new FormControl<Filter>(this.demographyModes[0], [Validators.required]),
        hairColor: new FormControl<Filter | null>(null, [Validators.required]),
        nationality: new FormControl<Filter | null>(null, [Validators.required])
    })
    public colorEnum?: Filter[];
    public countryEnum?: Filter[];
    public resultDemography?: number;

    public hairPercentageData: any;
    public selectedHairPercentage?: Filter[];
    public selectedCountryPercentage?: Filter[];

    constructor(private fb: FormBuilder, private personService: PersonService, private demographyService: DemographyService, private enumService: EnumService) {
        this.enumService.countryEnum.subscribe({
            next: data => {
                this.countryEnum = data!;
                this.selectedCountryPercentage = data!;
            }
        });
        this.enumService.colorEnum.subscribe({
            next: data => {
                this.colorEnum = data!;
                this.selectedHairPercentage = data!;
                this.getHairPercentageStatistic()
            }
        });
    }

    public clickResolveHeight() {
        this.personService.resolveOperation$(this.heightForm.controls['mode'].value?.value!, Number.parseFloat(this.heightForm.controls['height'].value!) || undefined)
            .subscribe({
                next: (data: CountResponseModel) => this.result = data.value
            });
    }

    public clickResolveDemography(): void {
        if (this.demographyForm.controls['mode'].value?.value === 'count') {
            this.demographyService.getNationalityPeopleCountByHairColor$(this.demographyForm.controls.nationality.value?.value! as Country, this.demographyForm.controls.hairColor.value?.value! as Color)
                .subscribe({
                    next: (data: CountResponseModel) => this.resultDemography = data.value
                })
        } else {
            this.demographyService.getHairColorPercentage$(this.demographyForm.controls.hairColor.value?.value! as Color)
                .subscribe({
                    next: (data: CountResponseModel) => this.resultDemography = data.value
                })
        }
    }

    public getHairPercentageStatistic(): void {
        forkJoin(this.selectedHairPercentage?.map(filter => this.demographyService.getHairColorPercentage$(filter.value as Color)) || EMPTY)
            .subscribe({
                next: (data) => this.hairPercentageData = {
                    labels: this.selectedHairPercentage?.map((filter) => filter.name),
                    datasets: [
                        {
                            data,
                            backgroundColor: this.selectedHairPercentage?.map((filter) => filter.value)
                        }
                    ]}
            })
    }

    public getCountryPercentageStatistic(): void {
        this.hairPercentageData = {
            labels: this.selectedCountryPercentage?.map((filter) => filter.name),
            datasets: []
        }
        for (const filter of this.selectedHairPercentage || []) {
            forkJoin(this.selectedCountryPercentage?.map(country => this.demographyService.getNationalityPeopleCountByHairColor$(country.value as Country, filter.value as Color)) || EMPTY)
                .subscribe({
                    next: (data) => {
                        this.hairPercentageData = {
                            ...this.hairPercentageData,
                            datasets: [
                                ...this.hairPercentageData.datasets,
                                {
                                    data: data.map(val => (val as unknown as CountResponseModel).value),
                                    backgroundColor: filter.value,
                                    label: filter.name
                                }
                            ]
                        }
                    }
                })
        }
    }

    public resetResultDemography(): void {
        this.resultDemography = undefined;
        this.getData()
    }

    public resetResult(): void {
        this.result = undefined;
    }

    public getData(): void {
        if (this.demographyForm.controls['mode'].value?.value !== 'count') {
            this.getHairPercentageStatistic()
        } else {
            this.getCountryPercentageStatistic()
        }
    }
}
