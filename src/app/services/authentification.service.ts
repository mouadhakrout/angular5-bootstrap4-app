import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {
  private removeCurentUserAction = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(environment.authenticate, { email: email, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.removeCurentUserAction.next(false);
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.removeCurentUserAction.next(true);
  }
  getHeaderStatus(): Observable<boolean> {
    return this.removeCurentUserAction.asObservable();
  }
}
