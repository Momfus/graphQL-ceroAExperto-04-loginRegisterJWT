import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

import { MeData } from '../../me/me-interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  access: boolean; // Para habilitar algunas acciones según si esta el usuario logueado

  constructor(  private auth: AuthService,
                private router: Router ) {

    // Para comprobar en tiempo real si tiene o no acceso el usuario
    this.auth.accessVar$.subscribe( (data: boolean) => {

      console.log('session state: ', data);

      // Para actualizqar si el usuario no esta más logueado
      if ( data === false && this.access ) {

        this.access = false;
        this.logout();

      } else {

        this.access = data;

      }

    } );

  }

  ngOnInit(): void {

    this.auth.start();

  }

  logout(): void {

    this.auth.logout();

  }

}
