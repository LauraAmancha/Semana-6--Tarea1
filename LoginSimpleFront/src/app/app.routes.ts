import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { inject } from '@angular/core';
import { AuthService } from './services/auth';
import { map } from 'rxjs/operators';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    // El Guard ahora espera a que el Backend confirme la cookie
    canActivate: [() => inject(AuthService).verificarSesionBackend().pipe(
      map(isLogged => isLogged || (inject(AuthService).logout(), false))
    )]
  }
];
