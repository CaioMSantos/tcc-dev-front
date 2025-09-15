import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DashboardDTO } from '../_models/DashboardDTO';
import { IndicatorsDTO } from '../_models/IndicatorsDTO';
import { PartnerSystemsDTO } from '../_models/PartnerSystemsDTO';
import { ReviewTeamDTO } from '../_models/ReviewTeamDTO';

@Injectable({
    providedIn: 'root'
})

export class DashBoardService {
    protected http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    dashboard(date: IndicatorsDTO) {
        return this.http.post<DashboardDTO>(`${environment.apiUrl}/indicators/api/indicators/Dashboard`, date)
            .pipe(
                catchError((err) => {
                    return of({} as DashboardDTO);
                }),
            );
    }


    individually(userId: number, month: number) {
        return this.http.get<ReviewTeamDTO>(`${environment.apiUrl}/indicators/api/indicators/Individually/${userId}/${month}`)
            .pipe(
                catchError((err) => {
                    return of({} as ReviewTeamDTO);
                }),
            );
    }

    partnerSystems() {
        return this.http.get<PartnerSystemsDTO[]>(`${environment.apiUrl}/indicators/api/indicators/PartnerSystems`)
            .pipe(
                catchError((err) => {
                    return of([]);
                }),
            );
    }

    getAllClients() {
        return this.http.get<any[]>(`${environment.apiUrl}/indicators/api/indicators/GetAllClients`)
            .pipe(
                catchError((err) => {
                    return of([]);
                }),
            );
    }

    searchProductsClient(userId: number){
        return this.http.get<any[]>(`${environment.apiUrl}/product/api/productclient/ProductsClientClient/${userId}`)
            .pipe(
                catchError((err) => {
                    return of([]);
                }),
            );
    }

    analysisComplements(){
        return this.http.get<any[]>(`${environment.apiUrl}/indicators/api/indicators/AnalysisComplements`)
            .pipe(
                catchError((err) => {
                    return of([]);
                }),
            );
    }
}