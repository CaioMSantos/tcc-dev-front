import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { IndividuallyComponent } from './individually/individually.component';

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        {
          path: 'individually',
          canActivate: [AuthGuard],
          component: IndividuallyComponent
        },
        {
          path: 'index',
          canActivate: [AuthGuard],
          component: IndexComponent,
        },
        { path: '', redirectTo: 'index', pathMatch: 'full' }
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DashboardRoutingModule {}