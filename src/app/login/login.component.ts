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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public login() {
    this.authenticationService.login(this.email, this.password)
      .subscribe(
        data => this.successForm(data),
        error => console.log(error.error.error)
      );
  }

  private successForm(data) {
    console.log(data);

    if (data.success) {
      localStorage.setItem('rmd-token', data.auth_token);
      this.router.navigate(['/']);
    }
  }
}
