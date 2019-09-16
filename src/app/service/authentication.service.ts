import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Principal} from '../model/Principal';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  public principal: Principal;

  login(username: string, password: string): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('/libintelLogin', 'username=' + username + '&password=' + password,
      {headers: headers, responseType: 'text', observe: 'response'})
      .subscribe(response =>
        window.location.href = response.headers.getAll('redirecturl')[0]
      );
  }

  logout(): Observable<string> {
    this.principal = null;
    return this.http.post('/logout', {}, {responseType: 'text'});
  }

  register(user: Principal, password: string): Observable<string> {
    const map = {};
    map['username'] = user.name;
    map['password'] = password;
    map['email'] = user.email;
    map['fullname'] = user.fullname;
    return this.http.post('/newUser', map, {headers: this.headers, responseType: 'text', observe: 'body'});
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

  isAuthenticated(): Observable<boolean> {
    return this.http.get<Principal>('/activeuser').map(
      entry => (entry !== null)
    );
  }

  updateUser(user: Principal): Observable<Principal> {
    const map = {};
    map['email'] = user.email;
    map['fullname'] = user.fullname;
    map['username'] = user.name;
    return this.http.put<Principal>('/updateCurrentUser', map, {headers: this.headers});
  }

  updatePassword(oldPassword: string, newPassword: string) {
    const map = {};
    map['newPassword'] = newPassword;
    map['oldPassword'] = oldPassword;
    return this.http.post('/updatePassword', map, {headers: this.headers});
  }
}
