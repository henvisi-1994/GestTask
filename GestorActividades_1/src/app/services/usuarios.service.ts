import { Usuario } from './../models/Usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
    API_URI = environment.API_URI; // URL de Backend

  constructor(private http: HttpClient, private router: Router) { }
  // Obtiene Usuarios desde bd mediante servidor backend
  getUsuarios() {
    return this.http.get(`${this.API_URI}/usuarios`);
  }
  getUsuario() {
    return this.http.get(`${this.API_URI}/usuarioauth`);
  }
  getGrupoUsuario() {
    return this.http.get(`${this.API_URI}/usuariogrupo`);
  }
// Elimina Usuarios teniendo id  desde bd mediante servidor backend
  // tslint:disable-next-line: variable-name
  deleteUsuario(id_user: number) {
    return this.http.delete(`${this.API_URI}/deleteUsuario/${id_user}`);
  }
// Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
 saveUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/createUsuario`, usuario);

  }
// Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  // tslint:disable-next-line: variable-name
  updateUsuario( id_user: number, updateUsuario: Usuario) {
    return this.http.put(`${this.API_URI}/updateUsuario/${id_user}`, updateUsuario);
  }
  loginUsuario(loginUsuario: Usuario): any {
    return this.http.post(`${this.API_URI}/login`, loginUsuario);
  }
  estaLogeado(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/']);
  }
  // tslint:disable-next-line: variable-name
  updateContrasena(id_usuario: number, updateUsuario: Usuario): any {
    return this.http.put(`${this.API_URI}/updateContrasena/${id_usuario}`, updateUsuario);
  }
// tslint:disable-next-line: variable-name
confirmContrasena(id_usuario: number, updateUsuario: Usuario): any {
  return this.http.put(`${this.API_URI}/confirmContrasena/${id_usuario}`, updateUsuario);
}

}
