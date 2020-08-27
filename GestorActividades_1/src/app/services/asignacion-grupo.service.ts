import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asig_grupo } from '../models/Asig_grupo.model';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AsignacionGrupoService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  // Obtiene Asig_grupos desde bd mediante servidor backend
  getAsig_grupos() {
    return this.http.get(`${this.API_URI}/verAsignacionesGrupo`);
  }
  // tslint:disable-next-line: variable-name
  getUsuariosGrupo(id_grupo: number) {
    return this.http.get(`${this.API_URI}/verUsuariosGrupo/${id_grupo}`);
  }
// Elimina Asig_grupos teniendo id  desde bd mediante servidor backend
  // tslint:disable-next-line: variable-name
  deleteAsig_grupo(id_grupo: number) {
    return this.http.delete(`${this.API_URI}/deleteAsig_grupo/${id_grupo}`);
  }
// Almacena en bd mediante  NgModel de Asig_grupo enviado a servidor backend
 // tslint:disable-next-line: variable-name
 saveAsig_grupo(asig_grupo: Asig_grupo) {
    return this.http.post(`${this.API_URI}/asignarGrupo`, asig_grupo);

  }
// Actualiza en bd mediante  NgModel de Asig_grupo y su id  enviado a servidor backend
  updateAsig_grupo({ id_grupo, updateAsig_grupo }: { id_grupo: string; updateAsig_grupo: Asig_grupo; }) {
    return this.http.put(`${this.API_URI}/reasignarGrupo/${id_grupo}`, updateAsig_grupo);
  }

}
