import { TestBed } from '@angular/core/testing';
import { WebsocketService } from './websocket.service';

describe('WebsocketService', () => {
  let service: WebsocketService;
  let webSocketWrapper: any; // Create a wrapper object for WebSocket

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketService],
    });
    service = TestBed.inject(WebsocketService);

    webSocketWrapper = {
      send: jasmine.createSpy('send'), // Spy on the send method
      close: jasmine.createSpy('close'), // Spy on the close method
    };

    service['socket'] = webSocketWrapper;

  });

  afterEach(() => {
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

  it('should receive a message', (done) => {
    const testMessage = 'Test message';
    service.connect();

    // Subscribe to the messageReceived subject
    service.messageReceived.subscribe((message) => {
      expect(message).toEqual(testMessage);
      done();
    });

    // Simulate a message being sent to the WebSocket
    service['socket'].dispatchEvent(new MessageEvent('message', { data: testMessage }));
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
