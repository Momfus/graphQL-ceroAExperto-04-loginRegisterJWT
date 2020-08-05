import { Component, OnInit } from '@angular/core';

import { LoginData, LoginResult } from './login.interface';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MeData } from '../me/me-interface';
import { AuthService } from '../../services/auth.service';
import { runInThisContext } from 'vm';


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

  constructor(  private api: ApiService,
                private auth: AuthService,
                private router: Router ) {

    this.auth.userVar$.subscribe( (data: MeData) => {

        // De no complirse ninguna de estas condiciones, mostrar formulario
        if ( data ==  null || data.status === false ) {

          this.show = true;

        } else {
          this.show = false;
        }

    } );

  }

  ngOnInit(): void {

    // Lo de abajo igual que lo que se hace en me.component.ts pero es para comprobar si ya esta logueado con un token válido
    // Comprobar si ya esta logueado (podria ponerse en otra función para hacerlo más limpio)
    this.auth.start()

  }

  save(): void {

    // Ingresar con lo ingresado por el usuario
    this.api.login( this.user.email, this.user.password )
        .subscribe( (result: LoginResult) => {

          this.show = true;
          if ( result.status ) {

            this.error = false;
            localStorage.setItem('tokenJWT', result.token);

            this.auth.updateStateSession(true);

            this.router.navigate(['/me']);

          } else {

            this.error = true;

            this.auth.updateStateSession(false);

            localStorage.removeItem('tokenJWT');
          }

        } );

  }

}
