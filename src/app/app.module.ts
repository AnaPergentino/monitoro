import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockComponent } from './stock/stock.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { NgChartsModule } from 'ng2-charts';

const config: SocketIoConfig = { url: 'ws://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    StockComponent,
    StockChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxApexchartsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
