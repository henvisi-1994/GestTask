import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../models/Actividad.model';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http:HttpClient) { }
  // Obtiene Actividads desde bd mediante servidor backend
  getActividads() {
    return this.http.get(`${this.API_URI}/actividades`);
  }
  // tslint:disable-next-line: variable-name
  getactividadesGrupo(id_grupo: number) {
    return this.http.get(`${this.API_URI}/actividadesGrupo/${id_grupo}`);
  }
// Elimina Actividads teniendo id  desde bd mediante servidor backend
  // tslint:disable-next-line: variable-name
  deleteActividad(id_act: number) {
    return this.http.delete(`${this.API_URI}/deleteActividad/${id_act}`);
  }
// Almacena en bd mediante  NgModel de Actividad enviado a servidor backend
 // tslint:disable-next-line: no-shadowed-variable
 saveActividad(Actividad: Actividad){
    return this.http.post(`${this.API_URI}/createActividad`, Actividad);

  }
// Actualiza en bd mediante  NgModel de Actividad y su id  enviado a servidor backend
  updateActividad( id_act: number, updateActividad: Actividad) {
    return this.http.put(`${this.API_URI}/updateActividad/${id_act}`, updateActividad);
  }

}
