import { Component, OnInit } from '@angular/core';

import { LoginData, LoginResult } from './login.interface';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


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

  constructor( private api: ApiService, private router: Router ) { }

  ngOnInit(): void {
  }

  save(): void {

    // Ingresar con lo ingresado por el usuario
    this.api.login( this.user.email, this.user.password )
        .subscribe( (result: LoginResult) => {

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
