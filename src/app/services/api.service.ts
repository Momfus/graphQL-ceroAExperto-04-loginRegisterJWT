import { Injectable } from '@angular/core';
import { getUsers, login, meData } from '../operations/query';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private apollo: Apollo ) { }

  // Lista de usuarios
  getUsers(): Observable<any> {

    return  this.apollo
    .watchQuery(
      {
        query: getUsers,
        fetchPolicy: 'network-only'  // Politica del uso de cache solo cuando hay conexión
      }
    ).valueChanges.pipe( map( (result: any) => {

      // se obtiene el valor de la consulta
      return result.data.users; // Users como se aclaro arriba

    }));

  }

  // Login
  login( email: string, password: string ): Observable<any> {

    return this.apollo // Ejemplo particular (luego se hará parametrizada)
    .watchQuery(
      {
        query: login,
        variables: {
          email,
          password
        }
      }
    ).valueChanges.pipe( map( (result: any) => {

      // se obtiene el valor de la consulta
      return result.data.login; // Users como se aclaro arriba

    }));

  }

  // Nuestra info con el token
  getMe( token: string ): Observable<any> {

    return this.apollo // Ejemplo particular (luego se hará parametrizada)
    .watchQuery(
      {
        query: meData,
        fetchPolicy: 'network-only',
        context: {

          headers: new HttpHeaders({
            authorization: token
          })

        }
      }
    ).valueChanges.pipe( map( (result: any) => {

      // se obtiene el valor de la consulta
      return result.data.me; // Users como se aclaro arriba

    }));

  }

}
