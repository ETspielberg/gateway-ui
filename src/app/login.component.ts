import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from './service/authentification.service';
import {Principal} from './model/Principal';
import {Message} from "primeng/primeng";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  authenticated: boolean;
  private username: string;
  private password: string;
  private admin: boolean;
  private fachreferent: boolean;
  private media: boolean;
  private analyst: boolean;
  private principal: Principal;
  public messages: Message[];

  constructor(private authentificationService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.authenticated = false;
    this.admin = false;
    this.fachreferent = false;
    this.media = false;
    this.analyst = false;
    this.authentificationService.updatePrincipal().subscribe(
      data => {
        this.principal = data;
        console.log(this.principal);
        if (this.principal !== null) {
          this.updateAuthorities();
        }
      }
    );
  }

  login() {
    this.authentificationService.login(this.username, this.password).subscribe(
      data => {
        this.principal = data;
        if (this.principal !== undefined) {
          this.updateAuthorities();
        }
      }, error => {
        this.messages = [];
        console.log('could not authenticate user ' + this.username);
        this.messages.push({
          severity: 'error', summary: 'Fehler: ',
          detail: 'Anmeldung fehlgeschlagen. Bitte Nutzerkennung und Passwort prüfen.'
        });
      }
      );
  }

  logout() {
    this.authentificationService.logout().subscribe(
      () => {}
    );
    this.authenticated = false;
  }

  private updateAuthorities() {
    this.authenticated = true;
    console.log('authenticated');
    this.admin = this.authentificationService.hasRole('admin');
    console.log('admin');
    this.fachreferent = this.authentificationService.hasRole('fachreferent');
    console.log('fachreferent');
    this.media = this.authentificationService.hasRole('media');
    console.log('media');
    this.analyst = this.authentificationService.hasRole('analyst');
    console.log('analyst');
  }
}
