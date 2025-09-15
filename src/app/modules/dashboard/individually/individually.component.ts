import { Component, OnInit } from '@angular/core';
import * as EChartOption from 'echarts';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { ReviewTeamDTO } from '../_models/ReviewTeamDTO';
import { DashBoardService } from '../_services/dashboard.service';

HC_exporting(Highcharts);

@Component({
  selector: 'app-individually',
  templateUrl: './individually.component.html',
  styleUrls: ['./individually.component.scss']
})
export class IndividuallyComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean>;

  //USUARIO
  usuario: any;
  usuarioId: number;

  data: any;
  //MESES DOS GRÁFICOS
  revisionData: any;
  nrData: any;
  basicOption: any[];

  //VALORES GRAFICOS ANUAIS
  monthsYear: [];
  revDiaYear: [];
  revNoiteYear: [];
  nrYear: [];
  revDays: [];
  nrDays: [];
  days: [];
  meta: any[];
  metaMonth: any;

  months: any;

  chardata: any[] = [];
  historicoAnoRevisados: any;
  historicoAnoNrs: any;
  historicoMesRevisados: any;
  historicoMesNrs: any;
  Highcharts: typeof Highcharts = Highcharts;
  EChartOption: typeof EChartOption = EChartOption;


  //4 GRÁFICOS
  optionRevisadosDia: any;
  optionNrDia: any;
  optionAtividadesDia: any;
  optionSubsegmentoDia: any;

  constructor(private dashBoardService: DashBoardService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,) {
    this.isLoading$ = new BehaviorSubject<boolean>(false),
      this.meta = [],
      this.getUser(),
      this.getIndicatorsYear(this.usuarioId)
  }

  getIndicatorsYear(userId: number) {
    this.spinner.show();
    this.isLoading$.next(true);
    this.dashBoardService.individually(userId,1).subscribe((response) => {
      this.getChart(response);
      this.isLoading$.next(false);
      this.spinner.hide();
    }, (err) => {
      this.isLoading$.next(false);
      this.spinner.hide();
    });
  }


  // getMetaMonth() {
  //   this.isLoading$.next(true);
  //   this.dashBoardService.getMetaRevMont("MetaRevMonth").subscribe((response) => {
  //     this.metaMonth = parseInt(response.result.value);
  //     this.isLoading$.next(false);
  //   })
  // }

  getUser() {
    return this.authService.getUserByToken().subscribe(response => {
      this.usuario = response;
      this.usuarioId = this.usuario.userPk;
    });
  }

  getChart(indicators: ReviewTeamDTO) {

    let dataValue = [indicators.historyReviewsYear.reviewsDay[0], indicators.historyReviewsYear.reviewsNight[0], indicators.historyReviewsYear.reviewsNr[0]];
    this.data = {
      labels: ['Dia', 'Noite', 'NR'],
      datasets: [
        {
          data: dataValue,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ]
    };

    this.historicoAnoRevisados = {
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Total por mês: '
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 250,
        y: 40,
        floating: true,
        borderWidth: 1,
        backgroundColor: 'white'
      },
      xAxis: {
        categories: indicators.historyReviewsYear.months,
      },
      yAxis: {
        title: {
          text: 'Quantidade'
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' Itens'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Dia',
        data: indicators.historyReviewsYear.reviewsDay
      }, {
        name: 'Noite',
        data: indicators.historyReviewsYear.reviewsNight
      }]
    };

    this.historicoAnoNrs = {
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Total por mês: '
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 250,
        y: 40,
        floating: true,
        borderWidth: 1,
        backgroundColor: 'white'
      },
      xAxis: {
        categories: indicators.historyReviewsYear.months,
      },
      yAxis: {
        title: {
          text: 'Quantidade'
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' Itens'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'NR',
        data: indicators.historyReviewsYear.reviewsNr,
        color: '#FF9187'
      }]
    };

    this.historicoMesRevisados = {
      series: [{
        //NOME DO OPERADOR
        name: "Revisados",
        data: indicators.historyReviewsMonth.reviewsDay
      }, {
        name: 'Meta',
        data: 700, // META
        marker: {
          lineWidth: 2,
          lineColor: 'rgb(247, 163, 92)',
          fillColor: 'white'
        },
        dataLabels: {
          enabled: false
        }
      },],
      chart: {
        type: 'line'
      },
      title: {
        text: 'Itens revisados por dia'
      },
      subtitle: {
        text: 'Source: CTributária'
      },
      yAxis: {
        title: {
          text: 'Itens Revisados (Qtd)'
        }
      },
      xAxis: {
        categories: indicators.historyReviewsMonth.days,
      },
    };

    this.historicoMesNrs = {
      series: [{
        //NOME DO OPERADOR
        name: "NR",
        data: indicators.historyReviewsMonth.reviewsNr,
        marker: {
          lineWidth: 2,
          lineColor: 'red',
          fillColor: 'red'
        },
      },],
      chart: {
        type: 'line'
      },
      title: {
        text: 'Itens NR por dia'
      },
      subtitle: {
        text: 'Source: FGF Revisão Fiscal'
      },
      yAxis: {
        title: {
          text: 'Itens NR (Qtd)'
        }
      },
      xAxis: {
        categories: indicators.historyReviewsMonth.days,
      },
    };
    //PRIMEIRO GRÁFICO
    this.optionRevisadosDia = {
      series: [
        {
          name: 'Revisados',
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 1428,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#ff4500'],
                [0.5, '#ffa500'],
                [0.70, '#afdef2'],
                [1, '#38c2a6']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 5,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 10,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            formatter: function (v: any) {
              switch (v + '') {
                case '20':
                  return 'a';
                case '50':
                  return 'b';
                case '70':
                  return 'c';
                case '100':
                  return 'd';
                default:
                  return '';
              }
            }
          },
          title: {
            offsetCenter: [0, '-20%'],
            fontSize: 15
          },
          detail: {
            fontSize: 20,
            offsetCenter: [0, '0%'],
            color: 'auto'
          },
          data: [
            {
              value: indicators.totalReviews,
              name: 'Revisados'
            }
          ]
        }
      ]
    };

    this.optionNrDia = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 1000,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.10, '#38c2a6'],
                [1, '#ff4500']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 5,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 10,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            formatter: function (v: any) {
              switch (v + '') {
                case '20':
                  return 'a';
                case '50':
                  return 'b';
                case '70':
                  return 'c';
                case '100':
                  return 'd';
                default:
                  return '';
              }
            }
          },
          title: {
            offsetCenter: [0, '-20%'],
            fontSize: 15
          },
          detail: {
            fontSize: 20,
            offsetCenter: [0, '0%'],
            color: 'auto'
          },
          data: [
            {
              value: indicators.totalNr,
              name: 'NR'
            }
          ]
        }
      ]
    };

    this.optionAtividadesDia = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 1000,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.10, '#ff4500'],
                [1, '#38c2a6']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 5,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 10,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            formatter: function (v: any) {
              switch (v + '') {
                case '20':
                  return 'a';
                case '50':
                  return 'b';
                case '70':
                  return 'c';
                case '100':
                  return 'd';
                default:
                  return '';
              }
            }
          },
          title: {
            offsetCenter: [0, '-20%'],
            fontSize: 15
          },
          detail: {
            fontSize: 20,
            offsetCenter: [0, '0%'],
            color: 'auto'
          },
          data: [
            {
              value: indicators.totalQueueActivities,
              name: 'Fila de Atividade'
            }
          ]
        }
      ]
    };

    this.optionSubsegmentoDia = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 1000,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.10, '#ff4500'],
                [1, '#38c2a6']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 5,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 10,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            formatter: function (v: any) {
              switch (v + '') {
                case '20':
                  return 'a';
                case '50':
                  return 'b';
                case '70':
                  return 'c';
                case '100':
                  return 'd';
                default:
                  return '';
              }
            }
          },
          title: {
            offsetCenter: [0, '-20%'],
            fontSize: 15
          },
          detail: {
            fontSize: 20,
            offsetCenter: [0, '0%'],
            color: 'auto'
          },
          data: [
            {
              value: indicators.totalSubsegmentos,
              name: 'Subsegmento'
            }
          ]
        }
      ]
    };
  }

  ngOnInit(): void {
    this.revisionData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
      datasets: [
        {
          label: 'Revisões',
          data: [12, 51, 62, 33, 21, 62, 45, 90, 70, 11, 20],
          fill: true,
          borderColor: 'rgb(124, 181, 236)',
          tension: .4,
          backgroundColor: 'rgba(124, 181, 236, 0.5)'
        }
      ]
    };

    this.nrData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
      datasets: [
        {
          label: 'NRS',
          data: [12, 51, 62, 33, 21, 62, 45, 90, 70, 11, 100],
          fill: false,
          borderColor: 'rgb(233, 98, 85)',
          tension: .4

        }
      ]
    };

    this.months = [
      { month: 'Janeiro', value: 1 },
      { month: 'Fevereiro', value: 2 },
      { month: 'Março', value: 3 },
      { month: 'Abril', value: 4 },
      { month: 'Maio', value: 5 },
      { month: 'Junho', value: 6 },
      { month: 'Julho', value: 7 },
      { month: 'Agosto', value: 8 },
      { month: 'Setembro', value: 9 },
      { month: 'Outubro', value: 10 },
      { month: 'Novembro', value: 11 },
      { month: 'Dezembro', value: 12 },
    ];

    // this.getUser();
  }

  selectMonth(event: any){
      this.spinner.show();
      this.isLoading$.next(true);
      this.dashBoardService.individually(this.usuarioId, event.value).subscribe((response) => {
        this.getChart(response);
        this.isLoading$.next(false);
        this.spinner.hide();
      }, (err) => {
        this.isLoading$.next(false);
        this.spinner.hide();
      });
  }
}
