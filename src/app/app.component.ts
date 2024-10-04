import {Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonListComponent} from './page/person-list/person-list.component';
import {EnumService} from './service/enum.service';
import {InitializeService} from './service/initialize.service';
import {Subject, takeUntil} from 'rxjs';
import {EnumResponseModel} from './model/response.model';
import {Filter} from './model/filter.model';

@Component({
	selector: 'app-root',
	standalone: true,
    imports: [CommonModule, PersonListComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
    private destroy$ = new Subject<void>();

	constructor(private enumService: EnumService, private initService: InitializeService) {
        this.initService.getColorEnum$()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: EnumResponseModel) => {
                    this.enumService.colorEnum = data.data.reduce((cur, val) => [...cur, {name: val, value: val}], new Array<Filter>());
                }
            })

        this.initService.getCountryEnum$()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: EnumResponseModel) => {
                    this.enumService.countryEnum = data.data.reduce((cur, val) => [...cur, {name: val, value: val}], new Array<Filter>());
                }
            })
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
