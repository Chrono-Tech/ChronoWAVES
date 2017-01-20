import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Shared chart options
  public globalChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    }
  }

  public barChartType: string = 'bar';

  // combo chart
  public comboChartLabels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  public chartColors: Array<any> = [{ // grey
    backgroundColor: "#7986cb",
    borderColor: "#3f51b5",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { // dark grey
    backgroundColor: "#eeeeee",
    borderColor: "#e0e0e0",
    pointBackgroundColor: "#e0e0e0",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  public comboChartLegend: boolean = true;

  public ComboChartData: Array<any> = [{
    data: [6, 5, 8, 8, 5, 5, 4],
    label: 'Series A',
    borderWidth: 1,
    type: 'line',
    fill: false
  }, {
    data: [5, 4, 4, 2, 6, 2, 5],
    label: 'Series B',
    borderWidth: 1,
    type: 'bar',
  }];

  public ComboChartOptions: any = Object.assign({
    animation: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  }, this.globalChartOptions);
}
