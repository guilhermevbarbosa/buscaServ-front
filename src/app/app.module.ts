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

import { CookieModule } from 'ngx-cookie';

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
import { MeusDadosComponent } from './views/perfil/meus-dados/meus-dados.component';

import { AuthGuardService } from './guards/auth-guard.service';
import { JobProvider } from './guards/job-provider.service';
import { NovoServicoComponent } from './views/perfil/novo-servico/novo-servico.component';
import { MeusServicosComponent } from './views/perfil/meus-servicos/meus-servicos.component';
import { EllipsisPipe } from './services/utils/ellipsis.pipe';
import { EditJobComponent } from './views/perfil/meus-servicos/edit-job/edit-job.component';

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
    MeusDadosComponent,
    NovoServicoComponent,
    MeusServicosComponent,
    EllipsisPipe,
    EditJobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    CookieModule.forRoot()
  ],
  providers: [AuthGuardService, JobProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
