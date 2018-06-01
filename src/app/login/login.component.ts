import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { TokenService } from '../token.service';

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
    private tokenService: TokenService,
    private router: Router
  ) {}

  public login(): void {
    this.error = null;

    this.authenticationService.login(this.email, this.password)
      .subscribe(
        data => this.successForm(data),
        error => this.errorForm(error.error)
      );
  }

  private successForm(data): void {
    console.log(data);

    if (data.success) {
      this.tokenService.token = data.auth_token;
      this.router.navigate(['/']);
    } else {
      this.errorForm(data);
    }
  }

  private errorForm(data): void {
    this.error = data.error;
  }
}
