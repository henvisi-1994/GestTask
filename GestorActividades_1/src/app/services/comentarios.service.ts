import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  getComentarios() {
    return this.http.get(`${this.API_URI}/comentarios`);
  }
  getcomentariosGrupo(id_grupo: number) {
    return this.http.get(`${this.API_URI}/comentariosGrupo/${id_grupo}`);
  }
  // tslint:disable-next-line: variable-name
  getComentariosUser(id_user: number) {
    return this.http.get(`${this.API_URI}/comentariosUser/${id_user}`);
  }
  // Actualiza en bd mediante  NgModel de Actividad y su id  enviado a servidor backend
  // tslint:disable-next-line: variable-name
  updateComentario(id_com: number, updateComentario: any) {
    return this.http.put(`${this.API_URI}/updateComentario/${id_com}`, updateComentario);
  }
  // Elimina Actividads teniendo id  desde bd mediante servidor backend
  // tslint:disable-next-line: variable-name
  deleteComentario(id_com: number) {
    return this.http.delete(`${this.API_URI}/deleteComentario/${id_com}`);
  }
}
