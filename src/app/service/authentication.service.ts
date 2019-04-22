import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Principal} from '../model/Principal';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/User';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  public principal: Principal;

  public user: User;

  login(username: string, password: string): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('/libintelLogin', 'username=' + username + '&password=' + password, {headers: headers, responseType: 'text', observe: 'response'})
      .subscribe(response => {
        console.log(response.headers.getAll('redirecturl'));
        window.location.href = response.headers.getAll('redirecturl')[0];
      });
  }

  logout(): Observable<string> {
    this.principal = null;
    this.user = null;
    return this.http.post('/logout', {}, {responseType: 'text'});
  }

  register(user: User): Observable<string> {
    const map: Map<string, string> = new Map<string, string>();
    map.set('username', user.username);
    map.set('password', user.password);
    map.set('email', user.email);
    map.set('fullname', user.fullname);
    return this.http.post('/newUser',
      map, {responseType: 'text'});
  }

  updatePrincipal(): Observable<Principal> {
    const observable = this.http.get<Principal>('/activeuser');
    observable.subscribe(
      data => {
          this.principal = data;
          if (this.principal !== null) {
            this.user = new User(this.principal.name, this.principal.email, this.principal.fullname);
          }
      },
    );
    return observable;
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<Principal>('/activeuser').map(
      entry => (entry !== null)
    );
  }

  updateUser(user: User): Observable<User> {
    const map: Map<string, string> = new Map<string, string>();
    map.set('email', user.email);
    map.set('fullname', user.fullname);
    map.set('username', user.username);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<User>('/updateCurrentUser', JSON.stringify(user), {headers: headers});
  }
}
