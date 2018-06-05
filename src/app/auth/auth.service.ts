import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { User } from 'models/user.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password });
  }

  registerUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/register_user`, { email, password });
  }

  sendActivationEmail() {
    return this.http.post(`${environment.apiUrl}/send_activation_email`, { });
  }

  getUserData(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/user`);
  }

  remindPassword(email: string) {
    return this.http.post(`${environment.apiUrl}/auth/recovery`, { email })
  }

  logOut() {
    return this.http.get(`${environment.apiUrl}/auth/logout`);
  }
}
