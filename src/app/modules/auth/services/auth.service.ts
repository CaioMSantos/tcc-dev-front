import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/UserDTO';
import { AuthModel } from '../models/auth.model';
import { Role } from '../models/roles.model';
import { AuthHTTPService } from './auth-http';

export type UserType = UserDTO | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  protected http: HttpClient;

  // public fields
  isAuthenticatedSubject: BehaviorSubject<boolean>;
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;
  currentTokenSubject: BehaviorSubject<String>;

  get isLoadingSubject$(): boolean {
    return this.isLoadingSubject.value;
  }

  get isAuthenticated$(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  get currentTokenValue(): String {
    return this.currentTokenSubject.value;
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    http: HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentTokenSubject = new BehaviorSubject<String>("null");
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
    this.http = http;
  }

  // public methods
  login(parameters: UserDTO): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.http.post<any>(`${environment.apiUrl}/login`, parameters).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    this.currentUserSubject.next(auth.clientUser);
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(true);
    this.isLoadingSubject.next(false);
    this.currentTokenSubject = new BehaviorSubject<String>(auth.authToken);


    return of(auth.clientUser);
  }

  // need create new user then login
  registration(user: UserDTO): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  public setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes

    auth.refreshToken = auth.authToken;
    auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);

    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  public getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  operators() {
    return this.http.get<UserDTO[]>(`${environment.apiUrl}/auth/api/user/Operators`)
      .pipe(
        catchError((err) => {
          return of({} as UserDTO[]);
        }),
      );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  hasRole(role: Role){
    var usuarioPerfil;
    this.getUserByToken().subscribe(response => {
      usuarioPerfil = response.perfilGestao;
    });
    return usuarioPerfil === role;
  }
}
