import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MeComponent } from './components/me/me.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardsService } from './guards/auth-guards.service';

// tslint:disable: max-line-length

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MeComponent, canActivate: [AuthGuardsService] }, // Se activa el canActivate para evitar que se vea si no hay token
  { path: 'users', component: UsersComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
