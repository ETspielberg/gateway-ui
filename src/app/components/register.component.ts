import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {User} from '../model/User';
import {Message} from 'primeng/primeng';
import {TranslateService} from '../translate';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  public passwordCheck: string;

  public user: User;

  public messages: Message[];

  constructor(private authenticationService: AuthenticationService, private translateService: TranslateService) {
  }

  ngOnInit() {
   this.user = new User('', '', '', '');
  }

  register() {
    let passwordsMatch = true;
    let passwordValid = true;
    let usernameValid = true;
    this.messages = [];
    if (this.user.password !== this.passwordCheck) {
      passwordsMatch = false;
      this.messages.push({
        severity: 'error', summary: this.translateService.instant('error.noMatchingPasswords.summary'),
        detail: this.translateService.instant('error.noMatchingPasswords.detail')
      });
    }
    if (this.user.password === undefined) {
      passwordValid = false;
      this.messages.push({
        severity: 'error', summary: this.translateService.instant('error.noPassword.summary'),
        detail: this.translateService.instant('error.noPassword.detail')
      });
    }
    if (this.user.username === undefined) {
      usernameValid = false;
      this.messages.push({
        severity: 'error', summary: this.translateService.instant('error.noUsername.summary'),
        detail: this.translateService.instant('error.noUsername.detail')
      });
    }
    if (passwordValid && passwordsMatch && usernameValid) {
      this.authenticationService.register(this.user).subscribe(
        data => this.authenticationService.login(this.user.username, this.user.password),
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
