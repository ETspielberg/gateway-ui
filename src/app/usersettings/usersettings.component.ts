import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Principal} from '../model/Principal';
import {Message} from 'primeng/primeng';
import {TranslateService} from '../translate';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html'
})


export class UsersettingsComponent implements OnInit {

  user: Principal;

  elisa: string;

  oldPassword: string;

  newPassword: string;

  newPasswordCheck: string;

  public messages: Message[];

  constructor(private route: ActivatedRoute,
                     private translateService: TranslateService,
                     private router: Router,
                     private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.updatePrincipal().subscribe(
      () => {
        this.user = this.authenticationService.principal;
      }
    );
  }

  updateUser() {
    this.authenticationService.updateUser(this.user).subscribe(
      data => {
        this.user = data;
        this.router.navigate(['start']);
      }
    );
  }

  updatePassword() {
    if (this.newPassword === this.newPasswordCheck) {
      this.authenticationService.updatePassword(this.oldPassword, this.newPassword).subscribe(
        data => this.router.navigate(['start'])
      );
    } else {
      console.log('passwords do not match.');
      this.messages = [];
      this.messages.push({
        severity: 'error', summary: this.translateService.instant('error.noMatchingPasswords.summary'),
        detail: this.translateService.instant('error.noMatchingPasswords.detail')
      });
    }
  }
}
