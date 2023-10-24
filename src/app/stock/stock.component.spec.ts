import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockComponent } from './stock.component';
import { MatCardModule } from '@angular/material/card';
import { StockChartComponent } from '../stock-chart/stock-chart.component';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockComponent, StockChartComponent],
      imports: [MatCardModule],
    });
    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;

    // Provide a mock input value for stockData
    component.stockData = { symbol: 'AAPL', quote: 150.0 }; // Replace with your mock data
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
