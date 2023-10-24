import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent {
  @Input()
  stockData!: { symbol: string; quote: number; };

}
