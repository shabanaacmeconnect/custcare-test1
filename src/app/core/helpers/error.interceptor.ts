import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {ApiService} from '../services/api.service'
import { EventService } from '../services/event.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService:ApiService, private eventService:EventService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err)
            this.authenticationService.setApiLoaderStatus();
            if (err.status === 401 ||err.status==403) {
                // auto logout if 401 response returned from api
                console.log( err)
                 this.authenticationService.logout();
                // location.reload();
            }
            if (err.status === 400 || err.status === 422 ) {
                if( err.error.data){
                    this.eventService.broadcast('error', {page:'',message:err.error.data.details[0].message});
                }
                else{
                    this.eventService.broadcast('error', {page:'',message:'Invalid Input'});

                }

            }
            else
            {
                this.eventService.broadcast('error', {page:'',message:'Some error occured. Please try again after some time.'});
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
