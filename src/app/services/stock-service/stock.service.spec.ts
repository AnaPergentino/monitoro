import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService],
    });
    service = TestBed.inject(StockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should update stocks', () => {
    const stockData = { symbol: 'AAPL', quote: 150 };
    service.updateStocks(stockData);

    const stocks = service.getStocks();
    stocks.subscribe((stockList) => {
      expect(stockList).toContain(stockData);
    });
  });

  it('should update past quotes when stocks are updated', () => {
    const stockData = { symbol: 'GOOG', quote: 2500 };
    service.updateStocks(stockData);

    const pastQuotes = service.getPastQuotes(stockData.symbol);
    expect(pastQuotes).toEqual([stockData.quote]);
  });

  it('should sort stocks in ascending order', () => {
    const stockData = { symbol: 'MSFT', quote: 300 };
    const stockData2 = { symbol: 'AMZN', quote: 3400 };

    service.updateStocks(stockData);
    service.updateStocks(stockData2);

    service.sortAscending();
    const stocks = service.getStocks();

    stocks.subscribe((stockList) => {
      expect(stockList[0].quote).toBeLessThanOrEqual(stockList[1].quote);
    });
  });

  it('should sort stocks in descending order', () => {
    const stockData = { symbol: 'FB', quote: 350 };
    const stockData2 = { symbol: 'NFLX', quote: 550 };

    service.updateStocks(stockData);
    service.updateStocks(stockData2);

    service.sortDescending();
    const stocks = service.getStocks();

    stocks.subscribe((stockList) => {
      expect(stockList[0].quote).toBeGreaterThanOrEqual(stockList[1].quote);
    });
  });

  it('should add a value to pastQuotes only once', () => {
    const symbol = 'AAPL';
    const quote = 100;

    // Get the initial length of pastQuotes
    const initialLength = service.getPastQuotes(symbol).length;

    // Call the method to update pastQuotes
    service.updatePastQuotes({ symbol, quote });

    // Get the length of pastQuotes after the update
    const updatedLength = service.getPastQuotes(symbol).length;

    // Expect the length to be incremented by 1
    expect(updatedLength).toEqual(initialLength + 1);

    // Check if the last element in pastQuotes is the new quote
    const lastValue = service.getPastQuotes(symbol)[updatedLength - 1];
    expect(lastValue).toEqual(quote);
  });
});
