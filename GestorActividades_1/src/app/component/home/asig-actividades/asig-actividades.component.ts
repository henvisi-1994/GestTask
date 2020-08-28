import { AsignacionActividaService } from './../../../services/asignacion-activida.service';
import { Asig_activ } from './../../../models/Asig_activ.model';
import { Usuario } from './../../../models/Usuario.model';
import { UsuariosService } from './../../../services/usuarios.service';
import { ActividadesService } from './../../../services/actividades.service';
import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/Actividad.model';
import { AsignacionGrupoService } from 'src/app/services/asignacion-grupo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asig-actividades',
  templateUrl: './asig-actividades.component.html',
  styleUrls: ['./asig-actividades.component.css']
})
export class AsigActividadesComponent implements OnInit {
  grupos: any;
  vgrupo: boolean;
  constructor(private usuarioService: UsuariosService,
              private actividadServices: ActividadesService,
    // tslint:disable-next-line: variable-name
              private asig_avtivService: AsignacionActividaService,
    // tslint:disable-next-line: variable-name
              private asig_grupoService: AsignacionGrupoService,
              private toastr: ToastrService) { }

  usuarios: any;
  actividades: any;
  // tslint:disable-next-line: variable-name
  id_user: number;
  id_grupo: number;
  tamano: number;
  asignacion: boolean;
  cont: any = 0;
  actividadesM: any;
  m = 0;
  asignaciones: any;
  grupo: any;
  ngOnInit(): void {
    this.getgrupos();

  }
  verificarGrupos(grupos: any) {
    if (grupos.length > 1) {
      this.vgrupo = true;
    } else {
      this.vgrupo = false;
    }
    this.almacenar_grupos(grupos);
  }
  almacenar_grupos(grupos: any) {
    if (this.vgrupo) {
      this.grupos = grupos;
    } else {
      localStorage.setItem('grupo', grupos[0].id_grupo);
      this.getUsuarios();
      this.getActividades();
      this.getAsignaciones();
    }
  }
  public seleccionarGrupo(event: any){
    localStorage.setItem('grupo', event);
    this.getUsuarios();
    this.getActividades();
    this.getAsignaciones();
  }
  public getgrupos() {
    this.usuarioService.getGrupoUsuario().subscribe(
      (res: any) => {
        this.grupos = res;
        this.verificarGrupos(res);
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  moverActividades(actividadesO: any) {
    // Cargar Actividades
    const myArray = actividadesO;
    // Cargar Usuarios
    const usuarios = this.usuarios;
    // tslint:disable-next-line: one-variable-per-declaration
    let i, j, k;
    // Inicio asignador
    // tslint:disable-next-line: one-variable-per-declaration
    const actividades = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < myArray.length; index++) {
      actividades.push(myArray[index].id_act);
    }
    for (i = actividades.length; i; i--) {
      j = Math.floor(Math.random() * i);
      k = actividades[i - 1];
      actividades[i - 1] = actividades[j];
      actividades[j] = k;
    }
    this.tamano = (Math.round(myArray.length / usuarios.length));
    this.actividadesM = actividades;
    }
  public asignarAlearoreo() {
    // inicializo objeto de asignacion
    this.cont++;
    // tslint:disable-next-line: prefer-for-of
    const init = (this.cont - 1) * this.tamano;
    const fin = ((this.cont * this.tamano));
    if (this.asignacion === false) {
      for (this.m = init; this.m < fin; this.m++) {
        if (this.m < this.actividadesM.length) {
          this.saveAsignacion({ id_act: this.actividadesM[this.m], id_user: this.id_user });
        }
      }
    }
  }
  public asignarUsuario(event: any) {
    this.grupo = localStorage.getItem('grupo');
    this.asig_avtivService.getAsig_actividadesG(this.grupo).subscribe(
      (res: any) => {
        const buscaUsuario = res.find(element => element.id_user === event);
        if (buscaUsuario) {
          this.asignacion = true;
        } else {
          this.asignacion = false;
        }
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  getActividades() {
    this.grupo = localStorage.getItem('grupo');
    this.actividadServices.getactividadesGrupo(this.grupo).subscribe(
      (res: any) => {
        this.moverActividades(res);
      },
      err => {
        this.toastr.error(err);
      }
    );

  }
  getUsuarios() {
    this.grupo = localStorage.getItem('grupo');
    this.asig_grupoService.getUsuariosGrupo(this.grupo).subscribe(
      (res: any) => {
        this.usuarios = res;
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public saveAsignacion(asignacion: Asig_activ) {
    this.asig_avtivService.saveAsig_activ(asignacion).subscribe(
      (res: any) => {
        this.toastr.success(res);
        this.getAsignaciones();
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public getAsignaciones() {
    this.grupo = localStorage.getItem('grupo');
    this.asig_avtivService.getAsig_actividadesG(this.grupo).subscribe(
      (res: any) => {
        this.asignaciones = res;
      },
      err => {
        this.toastr.error(err);
      }
    );
  }



}
