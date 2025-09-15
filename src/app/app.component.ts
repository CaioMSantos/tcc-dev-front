import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslationService} from './modules/i18n';
// language list
import {locale as enLang} from './modules/i18n/vocabs/en';
import {locale as chLang} from './modules/i18n/vocabs/ch';
import {locale as esLang} from './modules/i18n/vocabs/es';
import {locale as jpLang} from './modules/i18n/vocabs/jp';
import {locale as deLang} from './modules/i18n/vocabs/de';
import {locale as frLang} from './modules/i18n/vocabs/fr';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private config: PrimeNGConfig,
    private translationService: TranslationService) {

    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );

    this.config.setTranslation({
      accept: 'Aceitar',
      reject: 'Rejeitar',
      startsWith: "Começar Com",
      contains: "Contém",
      notContains: "Não contém",
      endsWith: "Terminar Com",
      equals: "Iguais",
      notEquals: "Não Iguais",
      noFilter: "Sem Filtro",
      lt: "Less than",
      lte: "Less than or equal to",
      gt: "Greater than",
      gte: "Great then or equals",
      is: "Is",
      isNot: "Is not",
      before: "Antes",
      after: "Depois",
      clear: "Limpar",
      apply: "Aplicar",
      matchAll: "Combinar Todos",
      matchAny: "Combinar Qualquer",
      addRule: "Adicionar Regra",
      removeRule: "Remover Regra",
      choose: "Escolher",
      upload: "Upload",
      cancel: "Cancelar",
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: "Hoje",
      weekHeader: "Wk",
      weak: 'Weak',
      medium: 'Médio',
      strong: 'Forte',
      passwordPrompt: 'Enter a password',
      emptyMessage: 'Nenhum resultado encontrado',
      emptyFilterMessage: 'Nenhum resultado encontrado'
    });
  }

  ngOnInit() {}
}
