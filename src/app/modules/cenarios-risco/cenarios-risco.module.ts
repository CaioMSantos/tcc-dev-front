import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardModule } from 'ng-wizard';
import { NgxSpinnerModule } from "ngx-spinner";
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { CenariosRiscoRoutingModule } from './cenarios-risco-routing.module';
import { CenariosRiscoComponent } from './cenarios-risco.component';
import { ListCenariosRiscoComponent } from './list-cenarios-risco/list-cenarios-risco.component';

@NgModule({
  declarations: [
    ListCenariosRiscoComponent,
    CenariosRiscoComponent
  ],
  imports: [
     CommonModule,
        CenariosRiscoRoutingModule,
        RouterModule,
        NgWizardModule,
        PanelModule,
            CommonModule,
            ToastModule,
            MessageModule,
            MessagesModule,
            FormsModule,
            NgxSpinnerModule,
            TableModule,
            SplitButtonModule,
            DialogModule,
            ConfirmDialogModule,
            InputTextModule,
            InputTextareaModule,
            FieldsetModule,
            ButtonModule,
            DropdownModule,
            PasswordModule,
            ReactiveFormsModule,
            MultiSelectModule,
            PaginatorModule,
            NgbTooltipModule,
            NgbModule,
            TabViewModule
  ]
})
export class CenariosRiscoModule { }
