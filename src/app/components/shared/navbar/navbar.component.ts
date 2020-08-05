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

    // Tenemos token (para ver si habilitar o no oopciones del navbar)
    if ( localStorage.getItem('tokenJWT') !== null ) {


      // Se llama a la consulta de meData
      this.auth.getMe().subscribe( (result: MeData) => {

        if ( result.status ) {

          this.access = true;

        } else {

          this.access = false;

        }


        console.log('getme', this.access);

      } );


    } else { // De no haber token

      this.access = false;
      console.log('not getme', this.access);

    }

  }

  logout(): void {

    this.auth.updateStateSession(false);
    localStorage.removeItem('tokenJWT');

    const currentRouter = this.router.url; // Obtener la ruta actual

    // En caso de no estar logueado y no se esta ni en registar ni en users al desloguearse, ir al login
    if ( currentRouter !== '/register' && currentRouter !== '/users' ) {

      this.router.navigate(['/login']);

    }


  }

}
