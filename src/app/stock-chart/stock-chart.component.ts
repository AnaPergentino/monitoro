import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
      borderColor: ['rgba(0, 173, 210, 1)'],
      backgroundColor: ['rgba(0, 173, 210,0.2)'],
    },
  ];

  public chartColors: Array<any> = [
    {
      // all colors in order
      backgroundColor: ['#d13537'],
    },
  ];
  public chartLabels: string[] = ['', '', '', '', '', '', ''];
  public chartLegend: boolean = false;
  public chartOptions: any = {
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
          display: false
      }
      },
    },
  };

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.pastQuotes = this.stockService.getPastQuotes(this.symbol);
    this.updateChartData(this.pastQuotes);

    this.pastQuotes$ = this.stockService.getPastQuotesObservable(this.symbol);
    this.pastQuotes$.subscribe((quotes) => {
      this.pastQuotes = quotes.quotes;
      this.updateChartData(this.pastQuotes);
      // Handle changes to historical quotes (e.g., update a chart).
    });
  }
  updateChartData(newData: any) {
    console.log(this.chartData);
    console.log(newData);
    this.chartData[0].data.push(newData[newData.length - 1]);

    if (this.chartData[0].data.length > 10) {
      this.chartData[0].data.shift();
    }

    this.chartData = [{ data: newData }];
    //this.chartData.series.data = newData;
  }
}
