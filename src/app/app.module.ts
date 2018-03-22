import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {appRouting} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register.component';
import {LoginComponent} from './login.component';
import {AuthentificationService} from './service/authentification.service';
import {ButtonModule, InputTextModule, MessagesModule} from "primeng/primeng";
import {UserService} from "./service/user.service";


@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent
  ],
  imports: [
    ButtonModule,
    InputTextModule,
    MessagesModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    appRouting
  ],
  providers: [HttpClientModule, AuthentificationService, UserService],
  exports: [LoginComponent, RegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
