import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../models/Grupo.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  // Obtiene Grupos desde bd mediante servidor backend
  getGrupos() {
    return this.http.get(`${this.API_URI}/grupos`);
  }
// Elimina Grupos teniendo id  desde bd mediante servidor backend
  // tslint:disable-next-line: variable-name
  deleteGrupo(id_grupo: number) {
    return this.http.delete(`${this.API_URI}/deleteGrupo/${id_grupo}`);
  }
// Almacena en bd mediante  NgModel de Grupo enviado a servidor backend
 saveGrupo(grupo: Grupo) {
    return this.http.post(`${this.API_URI}/createGrupo`, grupo);

  }
// Actualiza en bd mediante  NgModel de Grupo y su id  enviado a servidor backend
  // tslint:disable-next-line: variable-name
  updateGrupo(id_grupo: number, updateGrupo: Grupo) {
    return this.http.put(`${this.API_URI}/updateGrupo/${id_grupo}`, updateGrupo);
  }

}
