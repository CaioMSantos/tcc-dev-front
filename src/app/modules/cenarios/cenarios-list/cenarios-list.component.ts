import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from 'rxjs';
import { CadcenarioComponent } from '../cadcenario/cadcenario.component';
import { CenarioService } from '../services/cenarios.service';

@Component({
  selector: 'app-cenarios-list',
  templateUrl: './cenarios-list.component.html',
  styleUrls: ['./cenarios-list.component.scss']
})
export class CenariosListComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean>;
  filter_form: FormGroup;

  pageSize: number = 20;
  currentPage: number = 1;
  totalRecords: number;
  cenarios: any[];

  states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];


  constructor(
    private formBuilder: FormBuilder,
    private cenarioService: CenarioService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.isLoading$ = new BehaviorSubject<boolean>(false);
   }

  ngOnInit(): void {
    this.listCenarios(1);
    this.form();
  }

  form(){
    this.filter_form = this.formBuilder.group({
      codigo: [null],
      municipio: [null],
      uf: [null],
      page: [null],
      limit: [null]
    });
  }

  signPortal() {
    const modalRef = this.modalService.open(CadcenarioComponent, { size: 'xl' });
  }

  listCenarios(currentPage: number){
    this.spinner.show();
    this.isLoading$.next(true);

    debugger

    var parameters = {
      page: currentPage,
      limit: 20
    };

    this.cenarioService.listCenarios(parameters).subscribe((response) => {
      debugger
      this.cenarios = response.data;
      this.isLoading$.next(false);
      this.totalRecords = response.total;
      this.spinner.hide();
    }, (err) => {
      this.isLoading$.next(false);
      this.spinner.hide();

    })
  }

  filterCenarios(currentPage: number){
    this.spinner.show();
    this.isLoading$.next(true);

    debugger

    var parameters = {
      page: currentPage,
      limit: 20,
      ...(this.filter_form.value.codigo != null && { municipio: this.filter_form.value.codigo }),
      ...(this.filter_form.value.municipio != null && { municipio: this.filter_form.value.municipio })
    };

    debugger
    this.cenarioService.listCenarios(parameters).subscribe((response) => {
      debugger
      this.cenarios = response.data;
      this.isLoading$.next(false);
      this.totalRecords = response.total;
      this.spinner.hide();
    }, (err) => {
      this.isLoading$.next(false);
      this.spinner.hide();

    })
  }

  onChangePage(event: any) {
    this.currentPage = event.page + 1
    this.listCenarios(this.currentPage);
  }

  newCenario(){

  }
}
