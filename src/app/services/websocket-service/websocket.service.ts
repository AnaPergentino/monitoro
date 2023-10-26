import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Stock } from 'src/app/models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;

  constructor() { }
  messageReceived: Subject<Stock> = new Subject<Stock>();

  connect(): void {
    this.socket = new WebSocket('ws://localhost:8080/quotes');

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const rawData = JSON.parse(event.data);

      const symbols = Object.keys(rawData);
      const quote = rawData[symbols[0]];

      this.messageReceived.next({ symbol: symbols[0], quote });

    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  closeConnection(): void {
    if(this.socket)
      this.socket.close();
  }
}
