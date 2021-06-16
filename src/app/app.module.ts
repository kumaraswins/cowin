import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { TableComponent } from './table/table.component';
import { CowinComponent } from './cowin/cowin.component';
import { FormComponent } from './form/form.component';
import { ReactiveComponent } from './reactive/reactive.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CowinComponent,
    FormComponent,
    ReactiveComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    HttpConfigInterceptor
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
