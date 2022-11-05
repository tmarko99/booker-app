import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authenticated = new Subject<boolean>();
  authenticated$ = this.authenticated.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  isAuthenticated() {
    return this.httpClient.get<boolean>('http://localhost:3000/auth').pipe(
      tap((result) => {
        console.log('result', result);

        this.authenticated.next(true);
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    return this.httpClient.post('http://localhost:3000/auth/logout', {}).subscribe(() => {
      this.authenticated.next(false);
      this.router.navigate(['/login']);
    })
  }
}
