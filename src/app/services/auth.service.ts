import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { meData } from '../operations/query';
import { MeData } from '../components/me/me-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessVar = new Subject<boolean>();
  public accessVar$ = this.accessVar.asObservable(); // Simbolo $ se usa como estandar de que es un observable

  public userVar = new Subject<MeData>();
  public userVar$ = this.userVar.asObservable();

  constructor(  private apollo: Apollo,
                private router: Router) { }

  public updateStateSession( newValue: boolean ): void {

    this.accessVar.next( newValue );

  }

  public updateUser( newValue: MeData ): void {

    this.userVar.next( newValue );

  }

  logout(): void {

    this.updateStateSession(false);
    localStorage.removeItem('tokenJWT');

    const currentRouter = this.router.url; // Obtener la ruta actual

    // En caso de no estar logueado y no se esta ni en registar ni en users al desloguearse, ir al login
    if ( currentRouter !== '/register' && currentRouter !== '/users' ) {

      this.router.navigate(['/login']);

    }

  }

  // Para manejar las notificaciones
  private sincroValues( result: MeData, state: boolean ): void {

    this.updateStateSession(state);
    this.updateUser( result );

  }

  // Para iniciar sesión
  start(): void {

    // Tenemos token
    if ( localStorage.getItem('tokenJWT') !== null ) {

      // Se llama a la consulta de meData
      this.getMe().subscribe( (result: MeData) => {

        // Obtener suscripto los datos de consulta
        if ( result.status ) { // De tener un token no caducado y válido

          // Al estar en el sitio de logín y lo haga con éxito
          if ( this.router.url === '/login' ) {

            this.sincroValues( result, true );
            this.router.navigate(['/me']);

          }

        }

        // Estar o niniciada cambia los estados
        this.sincroValues( result, result.status );

      } );


    } else { // De no haber token

      this.sincroValues(null, false);

    }

  }

  // Obtener nuestro usuario y datos con el token
  // Nuestra info con el token
  getMe(): Observable<any> {

    return this.apollo // Ejemplo particular (luego se hará parametrizada)
    .watchQuery(
      {
        query: meData,
        fetchPolicy: 'network-only',
        context: {

          headers: new HttpHeaders({
            authorization: localStorage.getItem('tokenJWT')
          })

        }
      }
    ).valueChanges.pipe( map( (result: any) => {

      // se obtiene el valor de la consulta
      return result.data.me; // Users como se aclaro arriba

    }));

  }

}
