import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersettingsComponent} from './usersettings.component';
import {CommonModule} from '@angular/common';
import {ButtonModule, MessagesModule, MultiSelectModule, PasswordModule, SpinnerModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {usersettingsRouting} from './usersettings.routing';
import {TranslateModule} from '../translate/translate.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SpinnerModule,
    MessagesModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    MultiSelectModule,
    PasswordModule,
    usersettingsRouting],
  declarations: [UsersettingsComponent],
  exports: [UsersettingsComponent],
  providers: []
})

export class UsersettingsModule {
}
