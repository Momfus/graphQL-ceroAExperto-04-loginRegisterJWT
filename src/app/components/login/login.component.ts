import { Component, OnInit } from '@angular/core';

import { LoginData, LoginResult } from './login.interface';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MeData } from '../me/me-interface';


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
  show: boolean;

  constructor( private api: ApiService, private router: Router ) { }

  ngOnInit(): void {

    // Lo de abajo igual que lo que se hace en me.component.ts pero es para comprobar si ya esta logueado con un token válido
    // Comprobar si ya esta logueado (podria ponerse en otra función para hacerlo más limpio)
    if ( localStorage.getItem('tokenJWT') !== null ) {


      // Se llama a la consulta de meData
      this.api.getMe().subscribe( (result: MeData) => {

        // Obtener suscripto los datos de consulta
        if ( result.status ) { // De tener un token no caducado y válido
          console.log(result.user);
          this.router.navigate(['/me']);
        }

      });

    }

  }

  save(): void {

    // Ingresar con lo ingresado por el usuario
    this.api.login( this.user.email, this.user.password )
        .subscribe( (result: LoginResult) => {

          this.show = true;
          if ( result.status ) {

            this.error = false;
            localStorage.setItem('tokenJWT', result.token);
            this.router.navigate(['/me']);

          } else {

            this.error = true;
            localStorage.removeItem('tokenJWT');
          }

        } );

  }

}
