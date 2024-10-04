import { Component } from '@angular/core';
import { PersonComponent } from './component/person/person.component';
import {CommonModule} from '@angular/common';
import {PersonListComponent} from './page/person-list/person-list.component';

@Component({
	selector: 'app-root',
	standalone: true,
    imports: [CommonModule, PersonComponent, PersonListComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'soa-frontend';
}
