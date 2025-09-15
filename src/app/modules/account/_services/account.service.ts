import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { exhaustMap, map, catchError, tap, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    protected http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    UpdateUserPassword(user: any) {
        return this.http.post<any>(`${environment.apiUrl}/auth/api/user/UpdateUserPassword`, user)
            .pipe(
                catchError((err) => {
                    return of([]);
                }),
            );
    }

    UpdateUser(user: any) {
        return this.http.post<any>(`${environment.apiUrl}/auth/api/user/UpdateUser`, user)
            .pipe(
                catchError((err) => {
                    return of([]);
                }),
            );
    }
}