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

  updatePastQuotes(newStockData: { symbol: string; quote: number }) {
    const symbol = newStockData.symbol;
    const quote = newStockData.quote;

    let quotes = this.pastQuotes.get(symbol) || [];

    quotes.push(quote);

    if (quotes.length > 10) {
      quotes.shift();
    }

    this.pastQuotes.set(symbol, quotes);

    if (this.pastQuotesSubjects.has(symbol)) {
      this.pastQuotesSubjects.get(symbol)!.next({ symbol, quotes });
    }
  }

  sortAscending() {
    this.stocks.sort((a, b) => a.quote - b.quote);
  }

  sortDescending() {
    this.stocks.sort((a, b) => b.quote - a.quote);
  }

  determineStockTrend(
    symbol: string,
    currentQuote: number
  ): 'up' | 'down' | 'unchanged' {
    const pastQuotes = this.getPastQuotes(symbol);
    if (pastQuotes.length < 2) {
      return 'unchanged';
    }

    const lastQuote = pastQuotes[pastQuotes.length - 2];
    if (currentQuote > lastQuote) {
      return 'up';
    } else if (currentQuote < lastQuote) {
      return 'down';
    } else {
      return 'unchanged';
    }
  }
}
