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

  public stats = {
    lastPrice: 10.5,
    volume24h: 500,
    high24h: 12,
    low24h: 9,
    change24h: -7.4
  };

  /**
   * My orders
   */
  public ownOrders = [
    { id: 1, type: 'Sell', price: 45.4, amount: 1002.88, total: 2234 },
    { id: 2, type: 'Sell', price: 45.4, amount: 1002.88, total: 2234 },
    { id: 3, type: 'Buy', price: 45.4, amount: 2002.88, total: 7234 }
  ];

  public rows = [
    {
      date: '2017-01-18 20:10',
      type: 'Sell',
      price: 45.4,
      amount: 1002.88,
      total: 2234
    },
    {
      date: '2017-01-18 20:10',
      type: 'Sell',
      price: 45.4,
      amount: 1002.88,
      total: 2234
    },
    {
      date: '2017-01-19 20:10',
      type: 'Buy',
      price: 45.4,
      amount: 2002.88,
      total: 7234
    }
  ];

  public sellOrders = [
    {
      price: 3,
      asset1Amount: 100,
      asset2Amount: 300,
      asset2Sum: 300
    },
    {
      price: 4,
      asset1Amount: 120,
      asset2Amount: 480,
      asset2Sum: 780
    },
    {
      price: 5,
      asset1Amount: 120,
      asset2Amount: 480,
      asset2Sum: 1560
    },
  ];
  public buyOrders = [
    {
      price: 2,
      asset1Amount: 50,
      asset2Amount: 100,
      asset2Sum: 100
    },
    {
      price: 1.5,
      asset1Amount: 50,
      asset2Amount: 75,
      asset2Sum: 175
    }
  ];

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
  public comboChartLabels: Array<any> = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'];
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
