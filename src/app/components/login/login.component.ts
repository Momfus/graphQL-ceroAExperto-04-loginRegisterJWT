import { Component, OnInit } from '@angular/core';

import { LoginData, LoginResult } from './login.interface';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: LoginData = {
    email: '',
    password: ''
  };

  error: boolean;

  constructor( private api: ApiService ) { }

  ngOnInit(): void {
  }

  save(): void {

    // Ingresar con lo ingresado por el usuario
    this.api.login( this.user.email, this.user.password )
        .subscribe( (result: LoginResult) => {

          console.log(result);

          if ( result.status ) {

            this.error = false;
            localStorage.setItem('tokenJWT', result.token);
            console.log('Login correcto');

          } else {

            this.error = true;
            localStorage.removeItem('tokenJWT');
            console.log('Login incorrecto');

          }

        } );

  }

}
