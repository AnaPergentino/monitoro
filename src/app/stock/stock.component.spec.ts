import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StockComponent } from './stock.component';
import { MatCardModule } from '@angular/material/card';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { StockService } from '../services/stock-service/stock.service';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

describe('StockComponent', () => {
  let fixture: ComponentFixture<StockComponent>;
  let component: StockComponent;
  let stockService: StockService;
  const mockStockData = { symbol: 'AAPL', quote: 150.0 };
  const mockStockTrend = 'up';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockComponent, StockChartComponent],
      imports: [MatCardModule, NgChartsModule, MatIconModule],
      providers: [StockService]

    });

    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    stockService = TestBed.inject(StockService);

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display stock symbol and quote', () => {
    component.stockData = { symbol: 'AAPL', quote: 150.0 };
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const symbol = element.querySelector('.stock-symbol');
    const quote = element.querySelector('.stock-quote');

    expect(symbol.textContent).toContain('AAPL');
    expect(quote.textContent).toContain('150.00');
  });


  xit('should initialize pastQuotes$ and subscribe to stockService', () => {
    spyOn(stockService, 'getPastQuotesObservable').and.returnValue(
      of({ symbol: mockStockData.symbol, quotes: [150.0, 151.0, 149.0] })
    );

    fixture.detectChanges();

    expect(component.pastQuotes$).toBeDefined();
    expect(component.stockTrend).toBeUndefined();
  });

  it('should set stockTrend when stockData changes', fakeAsync(() => {
    component.stockData = mockStockData;

    spyOn(stockService, 'determineStockTrend').and.returnValue(mockStockTrend);
    spyOn(stockService, 'getPastQuotesObservable').and.returnValue(
      of({ symbol: mockStockData.symbol, quotes: [150.0, 151.0, 149.0] })
    );

    fixture.detectChanges();
    tick();

    expect(component.stockTrend).toBe(mockStockTrend);
  }));
});
