import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxAppTour } from 'ngx-app-tour';

import { DemoComponent } from './demo.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  bootstrap: [DemoComponent],
  declarations: [DemoComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    OverlayModule,
    NgxAppTour.forRoot(),
    RouterModule.forRoot([{
      component: DemoComponent,
      path: '',
    }, {
      redirectTo: '',
      path: '**',
    }]),
  ],
})
export class DemoModule { }
