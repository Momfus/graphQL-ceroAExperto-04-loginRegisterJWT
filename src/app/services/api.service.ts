import { Injectable } from '@angular/core';
import { getUsers, login } from '../operations/query';
import { registerData } from '../operations/mutation';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterData } from '../components/register/register.interface';

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

  // Para registrar / añadir un nuevo usuario
  register( user: RegisterData ): Observable<any> {

    return this.apollo
            .mutate({
              mutation: registerData,
              variables: {
                user
              }
            });

  }


}
