import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;

  constructor() { }
  messageReceived: Subject<string> = new Subject<string>();

  connect(): void {
    this.socket = new WebSocket('ws://localhost:8080/quotes');

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);
      this.messageReceived.next(message);
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
    this.socket.close();
  }
}
