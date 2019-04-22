import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './service/authentication.service';
import {Principal} from './model/Principal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private authenticationservice: AuthenticationService) {
  }

  private principal: Principal;

  ngOnInit() {
    this.authenticationservice.updatePrincipal().subscribe(
      data => this.principal = data
    );
  }
}
