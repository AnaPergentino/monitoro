import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockComponent } from './stock.component';
import { MatCardModule } from '@angular/material/card';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('StockComponent', () => {
  let fixture: ComponentFixture<StockComponent>;
  let component: StockComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockComponent, StockChartComponent],
      imports: [MatCardModule, NgChartsModule]
    });

    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
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
});
