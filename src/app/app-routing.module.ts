import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './views/categorias/categorias.component';

import { LoginComponent } from './views/login/login.component';

import { PerfilComponent } from './views/perfil/perfil.component';
import { MeusDadosComponent } from './views/perfil/meus-dados/meus-dados.component';
import { NovoServicoComponent } from './views/perfil/novo-servico/novo-servico.component';

import { AuthGuardService } from './guards/auth-guard.service';
import { JobProvider } from './guards/job-provider.service';
import { MeusServicosComponent } from './views/perfil/meus-servicos/meus-servicos.component';

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
    component: PerfilComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'meus-dados',
    component: MeusDadosComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'novo-servico',
    component: NovoServicoComponent,
    canActivate: [JobProvider]
  },
  {
    path: 'meus-servicos',
    component: MeusServicosComponent,
    canActivate: [JobProvider]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
