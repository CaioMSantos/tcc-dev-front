import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { CadcenarioComponent } from './cadcenario/cadcenario.component';
import { CenariosListComponent } from './cenarios-list/cenarios-list.component';
import { CenariosComponent } from './cenarios.component';

const routes: Routes = [
    {
      path: '',
      component: CenariosComponent,
      children: [
        {
          path: 'list',
          canActivate: [AuthGuard],
          component: CenariosListComponent
        },
        {
          path: 'cadcenario',
          canActivate: [AuthGuard],
          component: CadcenarioComponent
        },
        {
          path: 'plano-acao',
          canActivate: [AuthGuard],
          component: CadcenarioComponent
        }
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CenariosRoutingModule {}