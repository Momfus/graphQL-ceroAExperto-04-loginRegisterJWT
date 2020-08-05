import { Component, OnInit } from '@angular/core';
import { MeData } from '../me/me-interface';
import { AuthService } from '../../services/auth.service';
import { RegisterData, RegisterResult } from './register.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  operation: number;
  message: string;

  register: RegisterData = {

    name: '',
    lastname: '',
    email: '',
    password: '',

  };

  constructor(  private api: ApiService,
                private auth: AuthService ) { }

  ngOnInit(): void {

    if ( localStorage.getItem('tokenJWT') !== null ) {

      // Se llama a la consulta de meData
      this.auth.getMe().subscribe( (result: MeData) => {

        // Obtener suscripto los datos de consulta
        if ( result.status ) { // De tener un token no caducado y válido

          this.auth.updateStateSession(true);

        } else {

          this.auth.updateStateSession(false);

        }

      });

    } else {
      this.auth.updateStateSession(false);
    }

  }

  save(): void {

    console.log(this.register);

    this.api.register( this.register ).subscribe( ({data}) => {

      console.log(data);

      // Control para mostrar información en pantalla según los datos recibidos
      const userResult: RegisterResult = data.register;

      if ( userResult.status ) {

        this.operation = 1;

      } else {

        this.operation = 2;

      }

      this.message = userResult.message;


    }, (error) => {

      console.error('Error enviando el query: ', error);
      this.operation = 3;
      this.message = 'Error inesperado'


    });

  }

}
