import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GraphqlModule } from './graphql/graphql.module';
import { LoginComponent } from './components/login/login.component';
import { MeComponent } from './components/me/me.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphqlModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
