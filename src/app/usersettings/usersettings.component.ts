import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {User} from '../model/User';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html'
})


export class UsersettingsComponent implements OnInit {

  user: User;

  elisa: string;

  constructor(private route: ActivatedRoute,
                     private router: Router,
                     private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.updatePrincipal().subscribe(
      () => {
        this.user = this.authenticationService.user;
      }
    );
  }

  updateUser() {
    this.authenticationService.updateUser(this.user).subscribe(
      data => this.router.navigate(['start'])
    );
  }
}
