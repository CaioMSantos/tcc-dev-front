import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardConfig, NgWizardService, THEME } from 'ng-wizard';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CenarioService } from '../services/cenarios.service';

@Component({
  selector: 'app-cadcenario',
  templateUrl: './cadcenario.component.html',
  styleUrls: ['./cadcenario.component.scss'],
  providers: [NgbAlertConfig, MessageService],
})
export class CadcenarioComponent implements OnInit {

  step: number = 1;

  locForm: FormGroup;
  cadForm: FormGroup;

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    anchorSettings: {
      anchorClickable: false,
    },
    //lang: { next: 'Próximo', previous: "Voltar" },
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false,
      toolbarExtraButtons: [
        // { text: 'Finalizar', class: 'btn btn-dark', event: () => { this.createUser()} }
      ],
    }
  };

    graus = [
    "Alto", "Muito Alto", "Médio", "Baixo"
  ];



  constructor(private spinner: NgxSpinnerService,
    public messageService: MessageService,
    private ngWizardService: NgWizardService,
    private cenarioService: CenarioService,
    private router: Router,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.cadastroForm();
  }

  cadastroForm() {
    this.cadForm = this.fb.group({
      monitoramento: [''],
      grau_risco: ['Médio'],
      nome_cenario: [''],
      descricao_cenario: [''],
      resumo_historico: [''],
      componentes_criticos: [''],
      municipio: [''],
      bairro: [''],
      endereco: [''],
      cep: [''],
      area_setor: [''],
      latitude: [null],
      longitude: [null]
    });
  }

  enviarFormulario() {
    debugger
    if (this.cadForm.invalid) {
      this.cadForm.markAllAsTouched();
      return;
    }
    this.cenarioService.criarCenario(this.cadForm.value).subscribe({
      next: (res) => {
        alert('Cenário cadastrado com sucesso!');
        this.cadForm.reset();
        this.router.navigate(['/cenarios-risco/list']); // <-- Redireciona
      },
      error: (err) => {
        alert('Erro ao cadastrar cenário.');
        console.error(err);
      }
    });

  }

  stepChanged(args: any) {
    console.log(args.step);
  };

  showPreviousStep(event?: Event) {
    this.step = 1;
    this.ngWizardService.previous();
  };

}
