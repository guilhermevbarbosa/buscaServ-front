import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Para usar [(ngModel)]
import { FormsModule } from '@angular/forms';
// Para usar [(ngModel)]

// Para requisições http
import { HttpClientModule } from '@angular/common/http';
// Para requisições http

// LOGIN
import { LoginComponent } from './views/login/login.component';
import { LoginCompComponent } from './views/login/components/login-comp/login-comp.component';
import { RegisterCompComponent } from './views/login/components/register-comp/register-comp.component';

// VIEWS
import { CategoriasComponent } from './views/categorias/categorias.component';
import { PerfilComponent } from './views/perfil/perfil.component';

// COMPONENTS
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardCategoriasComponent } from './components/card-categorias/card-categorias.component';

import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginCompComponent,
    RegisterCompComponent,
    CategoriasComponent,
    NavbarComponent,
    CardCategoriasComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
