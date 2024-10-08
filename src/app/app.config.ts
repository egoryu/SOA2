import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { PersonReducer } from './store/reducer/person.reducer';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { PersonEffects } from './store/effect/person.effect';
import {provideAnimations} from '@angular/platform-browser/animations';
import {httpErrorInterceptor} from './interceptor/http-error.interceptor';
import {MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
	providers: [
        provideStore({
            person: PersonReducer,
        }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideEffects([PersonEffects]),
        provideAnimations()
    ]
};
