import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenariosRiscoComponent } from './cenarios-risco.component';
import { ListCenariosRiscoComponent } from './list-cenarios-risco/list-cenarios-risco.component';

const routes: Routes = [
    {
      path: '',
      component: CenariosRiscoComponent,
      children: [
        {
          path: 'list',
          component: ListCenariosRiscoComponent
        }
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CenariosRiscoRoutingModule {}