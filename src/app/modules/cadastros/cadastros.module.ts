import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { CadastrosComponent } from './cadastros.component';
import { CebadeComponent } from './cebade/cebade.component';
import { CidadesComponent } from './cidades/cidades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    CidadesComponent,
    CebadeComponent,
    UsuariosComponent,
    CadastrosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CadastrosRoutingModule
  ]
})
export class CadastrosModule { }
