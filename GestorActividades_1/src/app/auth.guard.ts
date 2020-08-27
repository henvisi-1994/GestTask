import { UsuariosService } from './services/usuarios.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) {  }
  canActivate(): boolean {
    if (this.usuarioService.estaLogeado()) {
      // tslint:disable-next-line: variable-name
      const tipo_usuario = localStorage.getItem('tipo_usuario');
      if (tipo_usuario === 'integrante' || tipo_usuario === '') {
        this.router.navigate(['/home']);
      }
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }

}
