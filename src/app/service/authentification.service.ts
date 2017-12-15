import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Principal} from '../model/Principal';
import {Observable} from 'rxjs/Observable';
import * as appGlobals from '../app.globals';
import {User} from '../model/User';

@Injectable()
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  public principal: Principal;

  login(username: string, password: string): Principal {
    const token: string = 'Basic ' + btoa(username + ':' + password);
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get<Principal>('/activeuser', {headers : headers}).subscribe(
      data => {
        this.principal = data;
        console.log(this.principal);
      }
    );
    return this.principal;
  }

  logout(): Observable<string> {
    return this.http.post('/logout', {}, {responseType: 'text'});
  }

  register(user: User): Observable<string> {
    return  this.http.post('/newUser',
      {'username': user.username, 'password': user.password}, {responseType: 'text'});
  }

  isAuthenticated(): boolean {
    this.http.get<Principal>('/activeuser').subscribe(
      data => {
        this.principal = data;
        return !(this.principal === undefined);
      }
    );
    return false;
  }

  hasRole(role: string): boolean {
      return this.principal.roles && (this.principal.roles.indexOf('ROLE_' + role.toUpperCase()) > -1);
  }
}
