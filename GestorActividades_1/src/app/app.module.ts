import { TokenInterceptorService } from './services/token-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { FooterComponent } from './component/admin/partials/footer/footer.component';
import { BarraNotifComponent } from './component/admin/partials/barra-notif/barra-notif.component';
import { MenuAdminComponent } from './component/admin/partials/menu-admin/menu-admin.component';
import { PrincipalAdminComponent } from './component/admin/principal-admin/principal-admin.component';
import { HomeComponent } from './component/home/home/home.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { UsuariosComponent } from './component/admin/usuarios/usuarios.component';
import { ActividadesComponent } from './component/admin/actividades/actividades.component';
import { GruposComponent } from './component/admin/grupos/grupos.component';
import { RegistroUsuarioComponent } from './component/admin/registro-usuario/registro-usuario.component';
import { LoginComponent } from './component/admin/login/login.component';
import { MenuHomeComponent } from './component/home/menu-home/menu-home.component';
import { AsigActividadesComponent } from './component/home/asig-actividades/asig-actividades.component';
import { AsigGruposComponent } from './component/admin/asig-grupos/asig-grupos.component';
import { AuthGuard } from './auth.guard';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RevActivComponent } from './component/home/rev-activ/rev-activ.component';
import { BarraNotifHomeComponent } from './component/home/barra-notif-home/barra-notif-home.component';
import { PerfilUsuarioComponent } from './component/home/perfil-usuario/perfil-usuario.component';

const routes: Route[] = [
  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegistroUsuarioComponent },
  {path: 'home', component: HomeComponent,
  children: [
    {path: '', component: RevActivComponent },
    {path: 'asigActividades', component: AsigActividadesComponent },
    {path: 'revisarAct', component: RevActivComponent },
    {path: 'perfil', component: PerfilUsuarioComponent },
  ],
  canActivate: [AuthGuard]},
  {path: 'admin', component: PrincipalAdminComponent,
   children: [
    {path: '', component: DashboardComponent },
    {path: 'usuarios', component: UsuariosComponent },
    {path: 'actividades', component: ActividadesComponent },
    {path: 'grupos', component: GruposComponent },
    {path: 'asigGrupos', component: AsigGruposComponent },
     ],
     canActivate: [AuthGuard] },

];
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BarraNotifComponent,
    MenuAdminComponent,
    PrincipalAdminComponent,
    DashboardComponent,
    HomeComponent,
    UsuariosComponent,
    ActividadesComponent,
    GruposComponent,
    RegistroUsuarioComponent,
    LoginComponent,
    MenuHomeComponent,
    AsigActividadesComponent,
    AsigGruposComponent,
    RevActivComponent,
    BarraNotifHomeComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
