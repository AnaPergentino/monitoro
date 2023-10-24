import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Stock } from './../../models/stock.model'

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stocks: Stock[] = [];
  private stocksSubject: Subject<Stock[]> = new Subject<Stock[]>();
  private pastQuotes: Map<string, number[]> = new Map<string, number[]>();

  getStocks() {
    return this.stocksSubject.asObservable();
  }

  getPastQuotes(symbol: string): number[] {
    return this.pastQuotes.get(symbol) || [];
  }

  updateStocks(newStockData: { symbol: string; quote: number }) {
    const existingStockIndex = this.stocks.findIndex((stock) => stock.symbol === newStockData.symbol);

    if (existingStockIndex !== -1) {
      // Update the current quote.
      this.stocks[existingStockIndex].quote = newStockData.quote;
    } else {
      // Create a new stock entry.
      this.stocks.push(newStockData);
    }

    // Update historical quotes.
    this.updatePastQuotes(newStockData);

    this.stocksSubject.next(this.stocks);
  }

  private updatePastQuotes(newStockData: { symbol: string; quote: number }) {
    const symbol = newStockData.symbol;
    const quote = newStockData.quote;

    // Get the current historical quotes for the stock or create an empty array if it doesn't exist.
    let quotes = this.pastQuotes.get(symbol) || [];

    // Add the new quote to the beginning of the array.
    quotes.unshift(quote);

    // Keep only the last 10 quotes.
    if (quotes.length > 10) {
      quotes.pop();
    }

    // Update the historical quotes for the stock.
    this.pastQuotes.set(symbol, quotes);
  }
}
