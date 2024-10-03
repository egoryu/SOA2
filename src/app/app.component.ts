import { Component } from '@angular/core';
import { PersonComponent } from './page/person/person.component';
import {CommonModule} from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, PersonComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'soa-frontend';
}
