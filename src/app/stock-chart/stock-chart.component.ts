import { Component, Input } from '@angular/core';
import { StockService } from '../services/stock-service/stock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent {
  @Input()
  symbol!: string;

  pastQuotes: number[] = [];
  pastQuotes$: Observable<{ symbol: string; quotes: number[] }> =
    new Observable();

  public chartData: any[] = [
    {
      data: [],
      label: this.symbol,
    },
  ];

  public chartLabels: string[] = ['', '', '','', '', '', '', '', '', ''];
  public chartLegend: boolean = false;
  public chartOptions: any = {
    borderColor: ['rgba(0, 173, 210, 1)'],
    backgroundColor: ['rgba(0, 173, 210,0.2)'],
    pointBorderColor: '#fff',
    pointBackgroundColor: 'rgba(0, 173, 210,0.2)',

    fill: 'origin',

    elements: {
      line: {
        tension: 0.5,
      },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.pastQuotes = this.stockService.getPastQuotes(this.symbol);
    this.updateChartData(this.pastQuotes);

    this.pastQuotes$ = this.stockService.getPastQuotesObservable(this.symbol);
    this.pastQuotes$.subscribe((pastQuotes) => {
      this.pastQuotes = pastQuotes.quotes;
      this.updateChartData(this.pastQuotes);
    });
  }
  updateChartData(newData: any) {
    this.chartData = [{ data: newData }];
  }
}
