import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule
  ],
})
export class MaterialModule {}
