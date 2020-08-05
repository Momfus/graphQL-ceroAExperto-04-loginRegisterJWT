import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from './user.interface';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor( private api: ApiService ) { }

  ngOnInit(): void {

    // Se llama a la consulta en apollo para traer lo necesario.
    this.api.getUsers().subscribe( (result: User[]) => {

      // Obtener suscripto los datos de consulta
      this.users = result;

      console.log( this.users);

    });

  }

}
