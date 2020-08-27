import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';

const SECRET_KEY = 'gesact**';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private usuarioService: UsuariosService) { }
  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `${SECRET_KEY} ${this.usuarioService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
