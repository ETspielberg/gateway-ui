import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  hasRole(role: string) {
    return this.authenticationService.principal.roles && (this.authenticationService.principal.roles.indexOf('ROLE_' + role.toUpperCase()) > -1);
  }

  logout() {
    this.authenticationService.logout().subscribe(
      data => this.router.navigate(['/goodbye'])
    );
  }

}
