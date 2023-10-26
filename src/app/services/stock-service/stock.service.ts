import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stock } from './../../models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stocks: Stock[] = [];
  private stocksSubject: Subject<Stock[]> = new Subject<Stock[]>();
  private pastQuotes: Map<string, number[]> = new Map<string, number[]>();
  private pastQuotesSubjects: Map<
    string,
    Subject<{ symbol: string; quotes: number[] }>
  > = new Map();

  getStocks() {
    return this.stocksSubject.asObservable();
  }

  getPastQuotes(symbol: string): number[] {
    return this.pastQuotes.get(symbol) || [];
  }
  getPastQuotesObservable(
    symbol: string
  ): Observable<{ symbol: string; quotes: number[] }> {
    if (!this.pastQuotesSubjects.has(symbol)) {
      this.pastQuotesSubjects.set(
        symbol,
        new Subject<{ symbol: string; quotes: number[] }>()
      );
    }
    return this.pastQuotesSubjects.get(symbol)!.asObservable();
  }
  updateStocks(newStockData: { symbol: string; quote: number }) {
    const existingStockIndex = this.stocks.findIndex(
      (stock) => stock.symbol === newStockData.symbol
    );

    if (existingStockIndex !== -1) {
      this.stocks[existingStockIndex].quote = newStockData.quote;
    } else {
      this.stocks.push(newStockData);
    }

    this.updatePastQuotes(newStockData);

    this.stocksSubject.next(this.stocks);
  }

  private updatePastQuotes(newStockData: { symbol: string; quote: number }) {
    const symbol = newStockData.symbol;
    const quote = newStockData.quote;

    let quotes = this.pastQuotes.get(symbol) || [];

    quotes.push(quote);

    if (quotes.length > 20) {
      quotes.shift();
    }

    this.pastQuotes.set(symbol, quotes);

    if (this.pastQuotesSubjects.has(symbol)) {
      this.pastQuotesSubjects.get(symbol)!.next({ symbol, quotes });
    }
  }

  // Sort stocks by ascending value
  sortAscending() {
    this.stocks.sort((a, b) => a.quote - b.quote);
  }

  // Sort stocks by descending value
  sortDescending() {
    this.stocks.sort((a, b) => b.quote - a.quote);
  }
}
