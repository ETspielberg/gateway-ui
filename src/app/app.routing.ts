import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {ModuleWithProviders} from '@angular/core';
import {StartComponent} from './components/start.component';
import {AuthenticationGuardService} from './service/authentication.guard.service';
import {GoodByeComponent} from './components/good.bye.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'start', component: StartComponent, canActivate: [AuthenticationGuardService]},
  {path: 'goodbye', component: GoodByeComponent},
  {path: 'usersettings', loadChildren: 'app/usersettings/usersettings.module#UsersettingsModule', canActivate: [AuthenticationGuardService]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
