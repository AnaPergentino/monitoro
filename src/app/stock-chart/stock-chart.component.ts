import { Component, Input } from '@angular/core';
import { StockService } from '../services/stock-service/stock.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent {
  @Input()
  symbol!: string;

  historicalQuotes: number[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit() {
    // Retrieve historical quotes for the given symbol
    this.historicalQuotes = this.stockService.getPastQuotes(this.symbol);
  }
}
