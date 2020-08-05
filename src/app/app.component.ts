import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

/* NOTA: recordar primero iniciar mongoDB, luego el proyecto anterior a este realizado en el curso para levantar la base de datos de los
usuarios a consumir y despues iniciar este proyecto */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loginRegisterJWT';

  constructor( private apollo: Apollo ) {}

  ngOnInit(): void {

    // Se realiza las consultas para grapqhl

    // Consulta para obtener los usuarios
    const getUsers = gql`

      query {
        users {
          id
          name
          lastname
          email
          registerDate
        }
      }
    `;

    // Se llama a la consulta en apollo para traer lo necesario.
    this.apollo
        .watchQuery(
          {
            query: getUsers,
            fetchPolicy: 'network-only'  // Politica del uso de cache solo cuando hay conexión
          }
        ).valueChanges.pipe( map( (result: any) => {

          // se obtiene el valor de la consulta
          return result.data.users; // Users como se aclaro arriba

        })).subscribe( (result) => {

          // Obtener suscripto los datos de consulta
          console.log(result);

        } );

    // Obtener el token del login del usuario
    const login = gql`
        query login( $email: String!, $password: String! ){
          login(email: $email, password: $password ) {
            status
            message
            token
          }
        }`;


    // Se llama a la consulta de login
    this.apollo // Ejemplo particular (luego se hará parametrizada)
        .watchQuery(
          {
            query: login,
            variables: {
              email: 'momfus@outlook.com',
              password: '1234'
            }
          }
        ).valueChanges.pipe( map( (result: any) => {

          // se obtiene el valor de la consulta
          return result.data.login; // Users como se aclaro arriba

        })).subscribe( (result) => {

          // Obtener suscripto los datos de consulta
          console.log(result);

        } );


  }

}
