import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
