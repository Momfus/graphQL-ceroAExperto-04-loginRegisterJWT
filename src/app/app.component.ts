import { Component } from '@angular/core';


/* NOTA: recordar primero iniciar mongoDB, luego el proyecto anterior a este realizado en el curso para levantar la base de datos de los
usuarios a consumir y despues iniciar este proyecto */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'loginRegisterJWT';

  constructor( ) {}

}
