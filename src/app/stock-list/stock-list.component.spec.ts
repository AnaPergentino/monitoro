import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListComponent } from './stock-list.component';
import { WebsocketService } from '../services/websocket-service/websocket.service';
import { StockService } from '../services/stock-service/stock.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let websocketService: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockListComponent],
      providers: [WebsocketService, StockService],
      imports: [MatChipsModule, MatProgressSpinnerModule]
    });
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    websocketService = TestBed.inject(WebsocketService);
    fixture.detectChanges();
  });

  afterEach(() => {
    websocketService.closeConnection();

  })

  afterAll(() => {
    if (websocketService['socket']) {
      websocketService['socket'].close();
    }
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
