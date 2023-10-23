import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket-services/websocket.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.sass']
})

export class StockListComponent {
  constructor(private websocketService: WebsocketService) { }
  receivedMessages: string[] = [];

  ngOnInit() {

    this.websocketService.connect();
    this.websocketService.messageReceived.subscribe((message: string) => {
      this.receivedMessages.push(message);
      this.websocketService.closeConnection();

    });

  }
}
