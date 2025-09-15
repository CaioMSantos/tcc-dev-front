import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from 'rxjs';
import { CadcenarioComponent } from '../../cenarios/cadcenario/cadcenario.component';
import { PlanoAcaoComponent } from '../../cenarios/plano-acao/plano-acao.component';
import { CenarioRiscoService } from '../_services/cenarios-risco.service';


@Component({
  selector: 'app-list-cenarios-risco',
  templateUrl: './list-cenarios-risco.component.html',
  styleUrls: ['./list-cenarios-risco.component.scss']
})
export class ListCenariosRiscoComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean>;
  filter_form: FormGroup;

  pageSize: number = 20;
  currentPage: number = 1;
  totalRecords: number;
  cenarios: any[];

  graus = [
    "Alto", "Muito Alto", "Médio", "Baixo"
  ];


  constructor(
    private formBuilder: FormBuilder,
    private cenarioService: CenarioRiscoService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.isLoading$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    this.listCenarios(1);
    this.form();
  }

  form() {
    this.filter_form = this.formBuilder.group({
      municipio: [null],
      nome_cenario: [null],
      grau_risco: ['Alto'],
      page: [null],
      limit: [null]
    });
  }

  signPortal() {
    const modalRef = this.modalService.open(CadcenarioComponent, { size: 'xl' });
  }

  openPlan(id_cenario: number) {
  const modalRef = this.modalService.open(PlanoAcaoComponent, { size: 'xl' });
  modalRef.componentInstance.id_cenario = id_cenario; // <-- passa para o componente do modal
}


  listCenarios(currentPage: number) {
    this.spinner.show();
    this.isLoading$.next(true);

    var parameters = {
      page: currentPage,
      limit: 20,

    };

    this.cenarioService.listCenarios(parameters).subscribe((response) => {
      this.cenarios = response.data;
      this.isLoading$.next(false);
      this.totalRecords = response.total;
      this.spinner.hide();
    }, (err) => {
      this.isLoading$.next(false);
      this.spinner.hide();

    })
  }

  listCenariosFilter(currentPage: number){
    this.spinner.show();
    this.isLoading$.next(true);

    var parameters = {
      page: currentPage,
      limit: 20,
      ...(this.filter_form.value.nome_cenario != null && { nome_cenario: this.filter_form.value.nome_cenario }),
      ...(this.filter_form.value.municipio != null && { municipio: this.filter_form.value.municipio }),
      ...(this.filter_form.value.grau_risco != null && { grau_risco: this.filter_form.value.grau_risco })
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

  filterCenarios(currentPage: number) {
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

  newCenario() {

  }

}
