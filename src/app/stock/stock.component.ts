import { Component, Input, OnInit } from '@angular/core';
import { StockService } from '../services/stock-service/stock.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  @Input()
  stockData!: { symbol: string; quote: number };
  stockTrend!: string;
  pastQuotes$: Observable<{ symbol: string; quotes: number[] }> =
    new Observable();
     pastQuotesSubscription: Subscription | undefined;

  constructor(private stockService: StockService) {

  }

  ngOnInit() {

    this.pastQuotes$ = this.stockService.getPastQuotesObservable(this.stockData.symbol);
    this.pastQuotesSubscription = this.pastQuotes$.subscribe(() => {
      this.handleStockDataChange()
    });

  }

  private handleStockDataChange() {

    if (this.stockData) {
      this.stockTrend = this.stockService.determineStockTrend(
        this.stockData?.symbol,
        this.stockData?.quote
      );

    }
  }

  ngOnDestroy() {
    if (this.pastQuotesSubscription) {
      this.pastQuotesSubscription.unsubscribe();
    }
  }
}
