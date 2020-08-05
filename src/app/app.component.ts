import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { ApiService } from './services/api.service';

/* NOTA: recordar primero iniciar mongoDB, luego el proyecto anterior a este realizado en el curso para levantar la base de datos de los
usuarios a consumir y despues iniciar este proyecto */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loginRegisterJWT';

  constructor( private api: ApiService ) {}

  ngOnInit(): void {

    // Se llama a la consulta en apollo para traer lo necesario.
    this.api.getUsers().subscribe( (result) => {

          // Obtener suscripto los datos de consulta
          console.log(result);

     });



    // Se llama a la consulta de login
    this.api.login('momfus@outlook.com', '1234' ).subscribe( (result) => {

          // Obtener suscripto los datos de consulta
          console.log(result);

    });

  }

}
