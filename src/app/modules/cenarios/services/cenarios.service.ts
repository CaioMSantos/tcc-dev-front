import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class CenarioService {

    protected http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }


    listCenarios(parameters: any) {
        return this.http.post<any>(`${environment.apiUrl}/incidentes/list`, parameters)
            .pipe(
                catchError((err) => {
                    return throwError(() => err);
                }),
            );

    }

    criarCenario(dados: any) {
        return this.http.post<any>(`${environment.apiUrl}/cenarios-risco/create`, dados)
            .pipe(
                catchError((err) => {
                    return throwError(() => err);
                }),
            );
    }

    getPlanoAcaoByCenario(id_cenario: number) {
        return this.http.get<any>(`http://localhost:3000/plano-acao/by-cenario/${id_cenario}`);
    }

    updatePlan(dados: any) {
        return this.http.put<any>(`${environment.apiUrl}/plano-acao/update`, dados)
            .pipe(
                catchError((err) => {
                    return throwError(() => err);
                }),
            );
    }

}
