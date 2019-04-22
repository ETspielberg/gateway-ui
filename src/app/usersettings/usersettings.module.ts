import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersettingsComponent} from './usersettings.component';
import {CommonModule} from '@angular/common';
import {ButtonModule, MultiSelectModule, PasswordModule, SpinnerModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {usersettingsRouting} from './usersettings.routing';
import {UserPasswordChangeComponent} from './user.password.change.component';
import {TranslateService} from '../translate';
import {TranslateModule} from '../translate/translate.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SpinnerModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    MultiSelectModule,
    PasswordModule,
    usersettingsRouting],
  declarations: [UsersettingsComponent, UserPasswordChangeComponent],
  exports: [UsersettingsComponent, UserPasswordChangeComponent],
  providers: []
})

export class UsersettingsModule {
}
