/// Configuración general de graphql - Tener en cuenta que se hace basado en la conexión realizada en proyecto anterior con MongoDB

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})

export class GraphqlModule {

  constructor( apollo: Apollo, httpLink: HttpLink ) {

    apollo.create({
      link: httpLink.create({ uri: 'https://sistema-jwt-momfus.herokuapp.com/graphql'}),
      cache: new InMemoryCache()
    })

  }

}
