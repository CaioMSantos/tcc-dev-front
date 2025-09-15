import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  HighchartsChartModule
} from "highcharts-angular";
import { NgxEchartsModule } from 'ngx-echarts';
import { LottieModule } from 'ngx-lottie';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { IndividuallyComponent } from './individually/individually.component';

export function playerFactory() { // add this line
  return import('lottie-web'); // add this line
}

@NgModule({
  declarations: [
    DashboardComponent,
    IndividuallyComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    DashboardRoutingModule,
    TableModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    MultiSelectModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DropdownModule,
    LeafletModule,
    HighchartsChartModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    PanelModule,
    SplitButtonModule,
    LottieModule.forRoot({ player: playerFactory})
  ]
})
export class DashboardModule { }
