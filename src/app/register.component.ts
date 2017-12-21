import {Component} from '@angular/core';
import {AuthentificationService} from './service/authentification.service';
import {Router} from '@angular/router';
import {User} from './model/User';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  public username: string;

  public passwordsMatch: boolean;

  public passwordValid: boolean;

  public usernameValid: boolean;

  public inUse: boolean;

  public errors: boolean;

  public password: string;

  public passwordCheck: string;

  constructor(private authentificationService: AuthentificationService, private router: Router) {
  }

  register() {
    this.passwordsMatch = true;
    this.passwordValid = true;
    this.usernameValid = true;
    if (this.password !== this.passwordCheck) {
      this.passwordsMatch = false;
    }
    if (this.password === undefined) {
      this.passwordValid = false;
    }
    if (this.username === undefined) {
      this.usernameValid = false;
    }
    this.errors = !( this.passwordValid && this.passwordsMatch && this.usernameValid);
    if (!this.errors) {
      this.authentificationService.register(new User(this.username, this.password)).subscribe(
        data => window.location.href = '/fachref',
        error => this.inUse = true
      );
    }
  }
}
