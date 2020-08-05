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

    this.auth.start();

  }

  save(): void {

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
