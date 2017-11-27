import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from './service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  authenticated: boolean;

  private username: string;

  private password: string;

  constructor(private authentificationService: AuthentificationService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.authentificationService.principal);
    this.authentificationService.checkActiveUser().subscribe(
      data => this.authenticated = true,
      error => this.authenticated = false
    );
  }

  login() {
    this.authentificationService.login(this.username, this.password).subscribe(
      data => {
        this.authenticated = true;
      }
    );
  }

  logout() {
    this.authentificationService.logout().subscribe(
      () => {}
    );
    this.authenticated = false;
  }

}
