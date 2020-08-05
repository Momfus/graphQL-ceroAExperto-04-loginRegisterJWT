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

  constructor(  private auth: AuthService,
                private router: Router ) {

    this.auth.userVar$.subscribe( (data: MeData) => {

      // De ser no nulo ni indefinido es porqque tiene una sesisión iniciada
      if ( data !==  null && data !== undefined ) {

        this.user = data.user;

      }

    });

  }

  ngOnInit(): void {

    this.auth.start();
  }

  logout(): void {

    this.auth.logout();

  }

}
