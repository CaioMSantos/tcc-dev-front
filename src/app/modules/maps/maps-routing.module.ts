import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GmapsComponent } from './gmaps/gmaps.component';
import { MapsComponent } from './maps.component';


const routes: Routes = [{
  path: '',
  component: MapsComponent,
  children: [{
    path: 'gmaps',
    component: GmapsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule { }

export const routedComponents = [
  MapsComponent,
  GmapsComponent
];
