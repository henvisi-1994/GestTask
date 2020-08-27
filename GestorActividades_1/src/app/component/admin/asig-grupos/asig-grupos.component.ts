import { GruposService } from 'src/app/services/grupos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { AsignacionGrupoService } from 'src/app/services/asignacion-grupo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asig-grupos',
  templateUrl: './asig-grupos.component.html',
  styleUrls: ['./asig-grupos.component.css']
})
export class AsigGruposComponent implements OnInit {
  usuarios: any;
  grupos: any;
  asignacionesG: any;
  // tslint:disable-next-line: variable-name
  id_user: number;
  // tslint:disable-next-line: variable-name
  id_grupo: number;
  asignacion: boolean;
  constructor(private usuarioService: UsuariosService,
              private gruposService: GruposService,
              private asigGrupos: AsignacionGrupoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAsignacionGrupo();
    this.getGrupos();
    this.getUsuarios();

  }
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (res: any) => {
        this.usuarios = res;
      },
      err => {
        this.toastr.error(err);
       }
    );
  }
  getGrupos() {
    this.gruposService.getGrupos().subscribe(
      (res: any) => {
        this.grupos = res;
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  getAsignacionGrupo() {
 this.asigGrupos.getAsig_grupos().subscribe(
   (res: any) => {
     this.asignacionesG = res;
   },
   err => {
     this.toastr.error(err);
  }
 );
  }
  public asignarGrupo(event: any) {
    const buscaUsuario = this.asignacionesG.find(element => element.id_user === event);
    if (buscaUsuario) {
      this.asignacion = true;
    } else {
      this.asignacion = false;
    }
  }
  public saveAsignacion() {
    this.asigGrupos.saveAsig_grupo({id_user: this.id_user, id_grupo: this.id_grupo}).subscribe(
      (res: any) => {
          this.getAsignacionGrupo();
      },
      err => {
        this.toastr.error(err);
      }
    );
  }

}
