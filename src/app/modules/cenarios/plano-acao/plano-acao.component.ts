import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardConfig, NgWizardService, THEME } from 'ng-wizard';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CenarioService } from '../services/cenarios.service';


@Component({
  selector: 'app-plano-acao',
  templateUrl: './plano-acao.component.html',
  styleUrls: ['./plano-acao.component.scss'],
  providers: [NgbAlertConfig, MessageService],
})
export class PlanoAcaoComponent implements OnInit {

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

  public id_cenario!: number;

  constructor(private spinner: NgxSpinnerService,
    public messageService: MessageService,
    private ngWizardService: NgWizardService,
    private cenarioService: CenarioService,
    private router: Router,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.cadastroForm();
    this.buscarPlanoAcaoPorCenario(this.id_cenario);
  }

  cadastroForm() {
    this.cadForm = this.fb.group({
      // IDs
      id_cenario: [null],
      id_plano: [null],

      // Cenário de risco
      monitoramento: [''],
      grau_risco: [''],
      nome_cenario: [''],
      descricao_cenario: [''],
      resumo_historico: [''],
      componentes_criticos: [''],
      codigo: [''],
      municipio: [''],
      bairro: [''],
      endereco: [''],
      cep: [''],
      area_setor: [''],
      latitude: [null],
      longitude: [null],

      // Plano de ação
      titulo: [''],
      objetivo: [''],
      etapa_preventiva: [''],
      etapa_mitigacao: [''],
      etapa_preparacao: [''],
      etapa_resposta: [''],
      etapa_recuperacao: [''],
      responsaveis: [''],
      recursos_necessarios: [''],
      cronograma_preventivo: [''],
      cronograma_preparacao: [''],
      cronograma_resposta: [''],
      cronograma_recuperacao: [''],
      indicadores_sucesso: [''],
      observacoes: ['']
    });

  }

  updatePlan() {
    if (this.cadForm.invalid) {
      this.cadForm.markAllAsTouched();
      return;
    }
    
    this.cenarioService.updatePlan(this.cadForm.value).subscribe({
      next: (res) => {
        alert('Plano atualizado com sucesso!');
        this.cadForm.reset();
        this.router.navigate(['/cenarios-risco/list']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        alert('Erro ao cadastrar cenário.');
        console.error(err);
      }
    });

  }

  buscarPlanoAcaoPorCenario(id_cenario: number) {
    this.cenarioService.getPlanoAcaoByCenario(id_cenario).subscribe({
      next: (res) => {
        this.cadForm.patchValue(res.plano);
        debugger
      },
      error: (err) => {
        alert('Erro ao buscar plano de ação do cenário.');
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
