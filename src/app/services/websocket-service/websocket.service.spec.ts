import { TestBed } from '@angular/core/testing';
import { WebsocketService } from './websocket.service';
import { Stock } from 'src/app/models/stock.model';

describe('WebsocketService', () => {
  let service: WebsocketService;
  let webSocketWrapper: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketService],
    });
    service = TestBed.inject(WebsocketService);

    webSocketWrapper = {
      send: jasmine.createSpy('send'),
      close: jasmine.createSpy('close'),
    };

    service['socket'] = webSocketWrapper;

  });

  afterEach(() => {
    if (service['socket']) {
      service['socket'].close();
    }
  });

  afterAll(() => {
    if (service['socket']) {
      service['socket'].close();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should establish a WebSocket connection', (done) => {
    // Use a spy to mock the WebSocket constructor
    const webSocketConstructorSpy = spyOn(window, 'WebSocket').and.callThrough();

    service.connect();

    expect(webSocketConstructorSpy).toHaveBeenCalledWith('ws://localhost:8080/quotes');

    done();

  });

  it('should send a message through WebSocket', () => {
    const message = 'Test message';

    service.sendMessage(message);

    expect(webSocketWrapper.send).toHaveBeenCalledWith(message);
  });

  it('should close the WebSocket connection', () => {
    service.closeConnection();

    expect(webSocketWrapper.close).toHaveBeenCalled();
  });

  xit('should receive a message', (done) => {
    const testMessage: Stock = {
      symbol: 'B3SA3',
      quote: 10.69,
      timestamp: 1698075281.715762,
    };
    service.connect();

    service.messageReceived.subscribe((message) => {
      expect(message).toEqual(testMessage);
      done();
    });

    // Create a custom event with a JSON message
    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify(testMessage),
    });

    // Dispatch the custom event to simulate the WebSocket message
    service['socket'].dispatchEvent(messageEvent);

  });

  it('should log WebSocket connection closed', () => {
    const consoleLogSpy = spyOn(console, 'log');

    service.connect();
    service['socket'].dispatchEvent(new CloseEvent('close'));

    expect(consoleLogSpy).toHaveBeenCalledWith('WebSocket connection closed:', jasmine.any(CloseEvent));
  });

  it('should log WebSocket error', () => {
    const consoleErrorSpy = spyOn(console, 'error');

    service.connect();
    service['socket'].dispatchEvent(new ErrorEvent('error'));

    expect(consoleErrorSpy).toHaveBeenCalledWith('WebSocket error:', jasmine.any(ErrorEvent));
  });
});
