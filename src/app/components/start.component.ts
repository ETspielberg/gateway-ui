import {Component} from '@angular/core';
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
    if (this.authenticationService.principal) {
      if (this.authenticationService.principal.roles) {
        if (this.authenticationService.principal.roles.indexOf('ROLE_' + role.toUpperCase()) > -1) {
          return true;
        }
      }
    }
    return false;
  }

  logout() {
    this.authenticationService.logout().subscribe(
      data => this.router.navigate(['/goodbye'])
    );
  }
}
