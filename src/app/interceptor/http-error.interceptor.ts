import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {inject} from '@angular/core';
import {MessageService} from 'primeng/api';
import {EMPTY} from 'rxjs';
import {ErrorService} from '../service/error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorService = inject(ErrorService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            errorService.errors.next(error);

            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })

            return EMPTY;
        })
    );
};
