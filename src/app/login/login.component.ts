import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: string;
  public password: string;
  public error: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public login() {
    this.error = null;

    this.authenticationService.login(this.email, this.password)
      .subscribe(
        data => this.successForm(data),
        error => this.errorForm(error)
      );
  }

  private successForm(data) {
    console.log(data);

    if (data.success) {
      localStorage.setItem('rmd-token', data.auth_token);
      this.router.navigate(['/']);
    }
  }

  private errorForm(data) {
    this.error = data.error.error;
  }
}
