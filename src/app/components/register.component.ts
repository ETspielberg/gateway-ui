import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Message} from 'primeng/primeng';
import {TranslateService} from '../translate';
import {Principal} from '../model/Principal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  public passwordCheck: string;

  public password: string;

  public user: Principal;

  public messages: Message[];

  constructor(private authenticationService: AuthenticationService,
              private translateService: TranslateService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new Principal('', ['ROLE_GUEST'], '', '');
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
    if (this.user.name === undefined) {
      usernameValid = false;
      this.messages.push({
        severity: 'error', summary: this.translateService.instant('error.noUsername.summary'),
        detail: this.translateService.instant('error.noUsername.detail')
      });
    }
    if (passwordValid && passwordsMatch && usernameValid) {
      this.authenticationService.register(this.user, this.password).subscribe(
        value => window.location.href = '/start',
        error => {
          console.log(error);
          this.messages.push({
            severity: 'error', summary: this.translateService.instant('error.register.summary'),
            detail: this.translateService.instant('error.register.detail')
          });
        }
      );
    }
  }
}
