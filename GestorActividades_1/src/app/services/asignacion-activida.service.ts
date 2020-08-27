import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asig_activ } from '../models/Asig_activ.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AsignacionActividaService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  // Obtiene Asig_activs desde bd mediante servidor backend
  getAsig_actividades() {
    return this.http.get(`${this.API_URI}/verAsignaciones`);
  }
  // tslint:disable-next-line: variable-name
  getAsig_actividadesG(id_grupo: number) {
    return this.http.get(`${this.API_URI}/verAsignaciones/${id_grupo}`);
  }
  // tslint:disable-next-line: variable-name
  getAsig_actividadesUsuario(id_user: number) {
    return this.http.get(`${this.API_URI}/verActividadesUsuario/${id_user}`);
  }
// Elimina Asig_activs teniendo id  desde bd mediante servidor backend
  // tslint:disable-next-line: variable-name
  deleteAsig_activ(id_act: number) {
    return this.http.delete(`${this.API_URI}/deleteAsigActividad/${id_act}`);
  }
// Almacena en bd mediante  NgModel de Asig_activ enviado a servidor backend
 // tslint:disable-next-line: variable-name
 saveAsig_activ(asig_activ: Asig_activ) {
    return this.http.post(`${this.API_URI}/asignarActividad`, asig_activ);

  }
// Actualiza en bd mediante  NgModel de Asig_activ y su id  enviado a servidor backend
  // tslint:disable-next-line: variable-name
  updateAsig_activ({ id_act, updateAsig_activ }: { id_act: string; updateAsig_activ: Asig_activ; }) {
    return this.http.put(`${this.API_URI}/reasignarActividad/${id_act}`, updateAsig_activ);
  }

}
