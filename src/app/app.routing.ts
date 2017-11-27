import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegisterComponent},
  {path : '', redirectTo: '/login', pathMatch: 'full'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
