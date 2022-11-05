import { CreateUserInput, User } from './../../../generated-types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(loginRequest: CreateUserInput) {
    return this.httpClient.post<User>('http://localhost:3000/auth/login', loginRequest);
  }
}
