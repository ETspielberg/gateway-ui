import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {appRouting} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register.component';
import {LoginComponent} from './login.component';
import {AuthentificationService} from './service/authentification.service';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    appRouting
  ],
  providers: [HttpClientModule, AuthentificationService],
  exports: [LoginComponent, RegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
