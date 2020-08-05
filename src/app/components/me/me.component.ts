import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeData } from './me-interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {


  user: any;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {

    // Tenemos token
    if ( localStorage.getItem('tokenJWT') !== null ) {


      // Se llama a la consulta de meData
      this.auth.getMe().subscribe( (result: MeData) => {

        // Obtener suscripto los datos de consulta
        if ( result.status ) { // De tener un token no caducado y válido

          console.log(result.user);
          this.user = result.user;

        } else {

          console.log('Token no válido');
          localStorage.removeItem('tokenJWT'); // Sacarlo de no ser válido (Cuando caduca por ejemplo)
          this.logout();

        }

      } );


    } else { // De no haber token

      this.logout();

    }

  }

  logout(): void {

    this.auth.updateStateSession(false);
    localStorage.removeItem('tokenJWT');
    this.router.navigate(['/login']);

  }

}
