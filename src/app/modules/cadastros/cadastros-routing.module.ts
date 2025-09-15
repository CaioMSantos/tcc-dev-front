import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrosComponent } from './cadastros.component';
import { CebadeComponent } from './cebade/cebade.component';
import { CidadesComponent } from './cidades/cidades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
    {
      path: '',
      component: CadastrosComponent,
      children: [
        {
          path: 'usuarios',
          component: UsuariosComponent
        },
        {
          path: 'cidades',
          component: CidadesComponent
        },
        {
          path: 'cebade',
          component: CebadeComponent
        }
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CadastrosRoutingModule {}