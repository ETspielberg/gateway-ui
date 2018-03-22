import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from './service/authentification.service';
import {Router} from '@angular/router';
import {User} from './model/User';
import {Usersettings} from './model/Usersettings';
import {UserService} from './service/user.service';
import {Message} from "primeng/primeng";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  public username: string;

  public passwordsMatch: boolean;

  public passwordValid: boolean;

  public usernameValid: boolean;

  public inUse: boolean;

  public errors: boolean;

  public password: string;

  public passwordCheck: string;

  public usersettings: Usersettings;

  public messages: Message[];

  constructor(private authentificationService: AuthentificationService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
   this.usersettings = new Usersettings('', '', '');
  }

  register() {
    this.passwordsMatch = true;
    this.passwordValid = true;
    this.usernameValid = true;
    this.messages = [];
    if (this.password !== this.passwordCheck) {
      this.passwordsMatch = false;
      this.messages.push({
        severity: 'error', summary: 'Registrierung  fehlgeschlagen. ',
        detail: ' Die eingegebenen Passwörter stimmen nicht überein.'
      });
    }
    if (this.password === undefined) {
      this.passwordValid = false;
      this.messages.push({
        severity: 'error', summary: 'Registrierung  fehlgeschlagen.',
        detail: 'Das eingegebene Passwort ist ungültig.'
      });
    }
    if (this.username === undefined) {
      this.usernameValid = false;
      this.messages.push({
        severity: 'error', summary: 'Registrierung  fehlgeschlagen.',
        detail: 'Der angegebene Nutzername ist ungültig.'
      });
    }
    this.errors = !(this.passwordValid && this.passwordsMatch && this.usernameValid);
    if (!this.errors) {
      this.authentificationService.register(new User(this.username, this.password)).subscribe(
        data => {
          this.usersettings.username = this.username;
          this.userService.create(this.usersettings).subscribe(
            () => {
              this.authentificationService.login(this.username, this.password).subscribe(
                () => window.location.href = '/');
            }
          );
        },
        error => {
          this.messages.push({
            severity: 'error', summary: 'Registrierung  fehlgeschlagen.',
            detail: 'er angebene Nutzername ist bereits vergeben.'
          });
          this.errors = true;
        }
      );
    }
  }
}
