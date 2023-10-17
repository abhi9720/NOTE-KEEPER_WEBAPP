import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.baseUrl}/v1/auth`;
  private key = "AuthToken"

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getToken() {
    return localStorage.getItem(this.key)
  }
  saveToken(token: any) {
    return localStorage.setItem(this.key, token)
  }
  removeToken() {
    return localStorage.removeItem(this.key)
  }

  isLoggedIn() {
    const token = this.getToken();
    if (token) {
      try {
        // Decode the JWT token
        const decodedToken: any = jwt_decode(token);


        // Check if the token is valid and not expired
        if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          // Token is valid and not expired
          return true;
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
    return false;
  }

  logOutUser() {
    this.removeToken()
    this.router.navigate(['/']);
  }
}
