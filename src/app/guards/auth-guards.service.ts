import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// Esto nos permite proteger los datos del usuario del localstorage
@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate {

  constructor(private router: Router) { }

  // Verificar que el token en localStore exista
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if ( localStorage.getItem('tokenJWT') != null ) {

      return true;

    }

    // Si no tiene, devolver a login
    this.router.navigate(['/login']);
    return false;

  }


}
