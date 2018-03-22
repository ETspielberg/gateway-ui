import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from './service/authentification.service';
import {Router} from '@angular/router';
import {User} from './model/User';
import {Usersettings} from './model/Usersettings';
import {UserService} from './service/user.service';
import {Message} from "primeng/primeng";
import {TranslateService} from "./translate";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  public username: string;

  public password: string;

  public passwordCheck: string;

  public usersettings: Usersettings;

  public messages: Message[];

  constructor(private authentificationService: AuthentificationService, private userService: UserService, private translateService: TranslateService) {
  }

  ngOnInit() {
   this.usersettings = new Usersettings('', '', '');
  }

  register() {
    let passwordsMatch = true;
    let passwordValid = true;
    let usernameValid = true;
    this.messages = [];
    if (this.password !== this.passwordCheck) {
      passwordsMatch = false;
      this.messages.push({
        severity: 'error', summary: this.translateService.instant('error.noMatchingPasswords.summary'),
        detail: this.translateService.instant('error.noMatchingPasswords.detail')
      });
    }
    if (this.password === undefined) {
      passwordValid = false;
      this.messages.push({
        severity: 'error', summary: this.translateService.instant('error.noPassword.summary'),
        detail: this.translateService.instant('error.noPassword.detail')
      });
    }
    if (this.username === undefined) {
      usernameValid = false;
      this.messages.push({
        severity: 'error', summary: this.translateService.instant('error.noUsername.summary'),
        detail: this.translateService.instant('error.noUsername.detail')
      });
    }
    if (passwordValid && passwordsMatch && usernameValid) {
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
            severity: 'error', summary: this.translateService.instant('error.register.summary'),
            detail: this.translateService.instant('error.register.detail')
          });
        }
      );
    }
  }
}
