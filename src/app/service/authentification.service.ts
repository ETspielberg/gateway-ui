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

  login(username: string, password: string): Observable<Principal> {
    const token: string = 'Basic ' + btoa(username + ':' + password);
    const headers = new HttpHeaders().set('Authorization', token);
    const observable  = this.http.get<Principal>('/activeuser', {headers : headers});
      observable.subscribe(
      data => {
        this.principal = data;
        console.log(this.principal);
      }
    );
    return observable;
  }

  logout(): Observable<object> {
    return this.http.post('/logout', {});
  }

  register(user: User): Observable<Principal> {
    const observable  = this.http.post<Principal>('/register', JSON.stringify(user), {headers: appGlobals.headers});
    observable.subscribe(
      data => this.principal = data
    );
    return observable;
  }

  public checkActiveUser(): Observable<Principal> {
    return this.http.get<Principal>('/activeuser');
  }
}
