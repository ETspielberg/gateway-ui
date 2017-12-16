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

  public authenticated: boolean;

  login(username: string, password: string): Observable<Principal> {
    const token: string = 'Basic ' + btoa(username + ':' + password);
    const headers = new HttpHeaders().set('Authorization', token);
    const observable = this.http.get<Principal>('/activeuser', {headers : headers});
      observable.subscribe(
      data => {
        this.principal = data;
        console.log(this.principal);
      }
    );
    return observable;
  }

  logout(): Observable<string> {
    return this.http.post('/logout', {}, {responseType: 'text'});
  }

  register(user: User): Observable<string> {
    return  this.http.post('/newUser',
      {'username': user.username, 'password': user.password}, {responseType: 'text'});
  }

  updatePrincipal(): Observable<Principal> {
    const observable = this.http.get<Principal>('/activeuser');
    observable.subscribe(
      data => {
        this.principal = data;
      },
    );
    return observable;
  }

  hasRole(role: string): boolean {
      return this.principal.roles && (this.principal.roles.indexOf('ROLE_' + role.toUpperCase()) > -1);
  }
}
