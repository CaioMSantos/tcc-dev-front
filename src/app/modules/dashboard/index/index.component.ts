import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  weatherDate: any;

  constructor() {

  }

  ngOnInit(): void {
    this.getWeatherInmetIBGE();
  }

  @ViewChild('barCanvas') barCanvas!: ElementRef;
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;

  weather: any = null;
  weatherError = '';
  user = { name: 'Caio', cargo: 'Gestor de Risco', cidade: 'Goiania', foto: '' };

  // Gráficos
  @ViewChild('evolucaoCanvas') evolucaoCanvas!: ElementRef;
  @ViewChild('setorCanvas') setorCanvas!: ElementRef;
  @ViewChild('statusCanvas') statusCanvas!: ElementRef;

  // Cards rápidos
  cards = [
    { title: 'Usuários', value: 15, icon: 'fa-user' },
    { title: 'Cenários', value: 6, icon: 'fa-map' },
    { title: 'Incidentes', value: 12, icon: 'fa-exclamation-triangle' },
    { title: 'Alertas', value: 4, icon: 'fa-bell' }
  ];

  // Notificações e eventos
  notifications = [
    { title: 'Manutenção programada', text: 'Servidor X ficará indisponível amanhã às 12h', date: '13/09/2025' },
    { title: 'Incidente crítico', text: 'Curto-circuito detectado no setor Leste', date: '13/09/2025' }
  ];

  checklist = [
    { text: 'Verificar equipamentos', checked: false },
    { text: 'Reunião com equipe', checked: true },
    { text: 'Testar gerador', checked: false }
  ];

  timeline = [
    { time: '08:00', event: 'Reunião de alinhamento' },
    { time: '10:30', event: 'Vistoria em campo' },
    { time: '14:00', event: 'Envio de relatório' }
  ];

  ngAfterViewInit() {
    this.renderCharts();
  }

  // Geração dos gráficos
  renderCharts() {
    // Gráfico de evolução (linha)
    new Chart(this.evolucaoCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Incidentes',
          data: [2, 5, 4, 7, 6, 3, 8],
          fill: false,
          borderColor: '#4e79a7'
        }]
      }
    });

    // Gráfico por setor (barra)
    new Chart(this.setorCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Norte', 'Sul', 'Centro', 'Leste'],
        datasets: [{
          label: 'Registros',
          data: [5, 7, 2, 6],
          backgroundColor: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2']
        }]
      }
    });

    // Gráfico de status (doughnut)
    new Chart(this.statusCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Abertos', 'Resolvidos'],
        datasets: [{
          data: [4, 20],
          backgroundColor: ['#f28e2c', '#4e79a7']
        }]
      }
    });
  }

  // Previsão do tempo
  // Exemplo de chamada para previsão do tempo em Goiás (GO)
cidade: any = null; // ou use uma tipagem melhor se quiser

async getWeatherInmetIBGE(cidadeIBGE: string = '5208707') {
  try {
    const url = `https://apiprevmet3.inmet.gov.br/previsao/${cidadeIBGE}`;
    const response = await axios.get(url);
    this.cidade = response.data[cidadeIBGE];
    debugger
    // ... resto do código
  } catch (e) {
    this.weatherError = 'Não foi possível carregar o clima (INMET IBGE).';
  }
}

getDias(cidade: any) {
  return Object.keys(cidade); // ['13/09/2025', '14/09/2025', ...]
}

getTurnos(diaObj: any) {
  return Object.keys(diaObj); // ['manha', 'tarde', 'noite']
}



}
