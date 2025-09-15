import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { AuthService, UserType } from 'src/app/modules/auth';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  user: any;
  userLogin: any;

  constructor(private auth: AuthService,) {}

  ngOnInit(): void {
    this.user = this.auth.currentUserSubject.asObservable();
    this.userLogin = this.user.source._value;
    // this.userLogin = this.user$.value
  }
}
