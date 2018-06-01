import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from './logged-in.guard';
import { LoginComponent } from './login/login.component';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  { path: '', redirectTo: '/public', pathMatch: 'full' },
  { path: 'public', component: PublicComponent },
  { path: 'private', component: PrivateComponent, canActivate: [LoggedInGuard], },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
