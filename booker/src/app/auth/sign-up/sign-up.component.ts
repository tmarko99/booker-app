import { CreateUserInput } from './../../../generated-types';
import { LoginService } from './../login/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CreateUserGQL } from 'src/generated-types';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private readonly createUserGql: CreateUserGQL,
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
  }

  signUp(createUserInput: CreateUserInput) {
    this.createUserGql.mutate({ createUserInput: createUserInput })
    .pipe(
      concatMap(() => {
        return this.loginService.login(createUserInput);
      })
    )
    .subscribe(() => {
      this.router.navigate(['/']);
    })
  }

}
