import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from './user.interface';
import { AuthService } from '../../services/auth.service';
import { MeData } from '../me/me-interface';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor( private api: ApiService, private auth: AuthService ) { }

  ngOnInit(): void {

    // Para saber el estado de la sesión y controlar el estado del menu
    if ( localStorage.getItem('tokenJWT') !== null ) {


      // Se llama a la consulta de meData
      this.auth.getMe().subscribe( (result: MeData) => {

        // Obtener suscripto los datos de consulta
        if ( result.status ) { // De tener un token no caducado y válido

          this.auth.updateStateSession( true );

        } else {

          this.auth.updateStateSession( false );

        }

      });

    } else { // De no haber token

      this.auth.updateStateSession( false );

    }

    // Se llama a la consulta en apollo para traer lo necesario.
    this.api.getUsers().subscribe( (result: User[]) => {

      // Obtener suscripto los datos de consulta
      this.users = result;

      console.log( this.users);

    });

  }

}
