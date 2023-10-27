import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChartComponent } from './stock-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { StockService } from '../services/stock-service/stock.service';
import { of, Observable } from 'rxjs';

describe('StockChartComponent', () => {
  let component: StockChartComponent;
  let fixture: ComponentFixture<StockChartComponent>;
  let stockService: StockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockChartComponent],
      providers: [StockService],
      imports: [NgChartsModule]

    });

    fixture = TestBed.createComponent(StockChartComponent);
    component = fixture.componentInstance;
    stockService = TestBed.inject(StockService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data with past quotes', () => {
    const symbol = 'AAPL';
    const pastQuotesData = { symbol, quotes: [100, 110, 120] };

    spyOn(stockService, 'getPastQuotesObservable').and.returnValue(of(pastQuotesData));

    component.symbol = symbol;
    component.ngOnInit();

    expect(component.pastQuotes).toEqual(pastQuotesData.quotes);
    expect(component.chartData[0].data).toEqual(pastQuotesData.quotes);
  });

  it('should unsubscribe from pastQuotes$ on component destroy', () => {
    const pastQuotes$: Observable<{ symbol: string; quotes: number[] }> =
    new Observable();
    spyOn(stockService, 'getPastQuotesObservable').and.returnValue(pastQuotes$);

    component.ngOnInit();
    if(component.pastQuotesSubscription)
    spyOn(component.pastQuotesSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.pastQuotesSubscription?.unsubscribe).toHaveBeenCalled();
  });
});
