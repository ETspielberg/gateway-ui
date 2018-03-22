import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from './service/authentification.service';
import {Principal} from './model/Principal';
import {Message} from "primeng/primeng";
import {TranslateService} from "./translate";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  private username: string;
  private password: string;

  public roles: Map<string, boolean>;
  private principal: Principal;
  public messages: Message[];

  constructor(private authentificationService: AuthentificationService, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.roles = new Map<string, boolean>();
    this.authentificationService.updatePrincipal().subscribe(
      data => {
        this.principal = data;
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
        this.messages.push({
          severity: 'error', summary: this.translateService.instant('error.login.summary'),
          detail: this.translateService.instant('error.login.detail')
        });
      }
      );
  }

  logout() {
    this.authentificationService.logout().subscribe(
      () => {}
    );
    this.roles['authenticated'] = false;
  }

  private updateAuthorities() {
    this.authentificationService.principal.roles.forEach(
      value => this.roles.set(value, true)
    );
  }
}
