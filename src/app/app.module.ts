import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {appRouting} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './components/register.component';
import {LoginComponent} from './components/login.component';
import {AuthenticationService} from './service/authentication.service';
import {ButtonModule, InputTextModule, MessagesModule, PanelModule} from 'primeng/primeng';
import {TranslateModule} from './translate/translate.module';
import {StartComponent} from './components/start.component';
import {AuthenticationGuardService} from './service/authentication.guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoodByeComponent} from './components/good.bye.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, StartComponent, GoodByeComponent
  ],
  imports: [
    ButtonModule,
    InputTextModule,
    MessagesModule,
    TranslateModule,
    PanelModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    appRouting
  ],
  providers: [HttpClientModule, AuthenticationService, AuthenticationGuardService],
  exports: [LoginComponent, RegisterComponent, StartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
