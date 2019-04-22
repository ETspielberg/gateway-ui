import {Component} from '@angular/core';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-passwordchange',
  templateUrl: 'user.password.change.component.html'
})
export class UserPasswordChangeComponent {

  password: string;

  passwordRepeat: string;

  identical: boolean;

  messages: Message[];

  changePassword() {
    this.checkPassword();
    if (this.identical) {
      console.log('new password : ' + this.passwordRepeat);
    } else {
      console.log('passwords do not match');
    }
  }

  checkPassword() {
    this.identical = this.password === this.passwordRepeat;
  }

}
