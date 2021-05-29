import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './views/categorias/categorias.component';

import { LoginComponent } from './views/login/login.component';
import { PerfilComponent } from './views/perfil/perfil.component';

import { AuthGuardService } from './guards/auth-guard.service';
import { MeusDadosComponent } from './views/perfil/meus-dados/meus-dados.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'meus-dados',
    component: MeusDadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
