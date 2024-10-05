import { Routes } from '@angular/router';
import {PersonListComponent} from './page/person-list/person-list.component';

export const routes: Routes = [
    { path: '~s335133/SOA2', component: PersonListComponent},
    { path: '**', redirectTo: '~s335133/SOA2' },
];
