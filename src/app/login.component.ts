import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from './service/authentification.service';

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

  constructor(private authentificationService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.admin = false;
    this.fachreferent = false;
    this.media = false;
    this.analyst = false;
    this.authenticated = this.authentificationService.isAuthenticated();
    if (this.authenticated) {
      this.updateAuthorities();
    } else {
      this.authenticated = false;
    }
  }

  login() {
    if (this.authentificationService.login(this.username, this.password) !== undefined) {
        this.updateAuthorities();
      } else {
     this.authenticated = false;
    }
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
