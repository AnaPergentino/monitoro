import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket-service/websocket.service';
import { Stock } from '../models/stock.model';
import { StockService } from '../services/stock-service/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent {
  constructor(
    private websocketService: WebsocketService,
    private stockService: StockService
  ) {}
  stocks: Stock[] = [];

  ngOnInit() {
    this.connect();

    this.websocketService.messageReceived.subscribe((message) => {
      const stockData = message as Stock;
      this.stockService.updateStocks(stockData);
    });

    this.stockService.getStocks().subscribe((updatedStocks) => {
      this.stocks = updatedStocks;
    });
  }
  disconnect() {
    this.websocketService.closeConnection();
  }
  connect() {
    this.websocketService.connect();
  }
  ngOnDestroy(): void {
    this.disconnect();
  }
  isThereDataToCharts(): boolean {
    return this.stocks?.length>10;
  }
  sortAscending() {
    this.stockService.sortAscending();
  }

  sortDescending() {
    this.stockService.sortDescending();
  }

}
