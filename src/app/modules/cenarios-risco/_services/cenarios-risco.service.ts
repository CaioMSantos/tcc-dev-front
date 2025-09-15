import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class CenarioRiscoService {

    protected http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }


    listCenarios(parameters: any) {
        return this.http.post<any>(`${environment.apiUrl}/cenarios-risco/list`, parameters)
            .pipe(
                catchError((err) => {
                    return throwError(() => err);
                }),
            );

    }
}
