import { CreateUserInput } from './../../../generated-types';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login(createUserInput: CreateUserInput) {
    this.loginService.login(createUserInput).subscribe(() => {
      this.router.navigate(['/']);
    })
  }
}
