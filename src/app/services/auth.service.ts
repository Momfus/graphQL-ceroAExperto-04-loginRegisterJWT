import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { meData } from '../operations/query';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessVar = new Subject<boolean>();
  public accessVar$ = this.accessVar.asObservable(); // Simbolo $ se usa como estandar de que es un observable

  constructor(private apollo: Apollo) { }

  public updateStateSession( newValue: boolean ): void {

    this.accessVar.next( newValue );

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
