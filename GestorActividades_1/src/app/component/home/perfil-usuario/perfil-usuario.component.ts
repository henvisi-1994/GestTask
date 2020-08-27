import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/Usuario.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: any;
  // tslint:disable-next-line: variable-name
  contrasena_usuario: '';
  fecha: Date;
  constructor(private usuarioService: UsuariosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsuario();
  }
  getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.usuario = res[0];
      },
      err => {
        this.toastr.error(err);
      }
    );
}
comprobarContrasena() {
  if (this.usuario.password === this.usuario.conf_contrasena) {
    return true;
  } else {
    this.toastr.error('Las contraseñas no coinciden');
    return false;
  }
}
saveUsuario() {
  this.usuarioService.updateUsuario(this.usuario.id_user, this.usuario).subscribe(
    (res: any) => {
      if (this.usuario.contrasena_user === '' && this.contrasena_usuario === '') {
        this.confirmContrasena();
      }
      this.toastr.success('Perfil Actualizado exitosamente');
    },
    err => {
      this.toastr.error(err);
    }
  );
}
 // tslint:disable-next-line: variable-name
 confirmContrasena() {
  this.usuarioService.confirmContrasena(this.usuario.id_usuario, this.usuario).subscribe(
    (res: any) => {
      this.toastr.success(res);
      this.actualizarContrasenia();
    },
    err => {
      this.toastr.error(err);
    }
  );
}
actualizarContrasenia() {
  this.usuario.password = this.contrasena_usuario;
  this.usuarioService.updateContrasena(this.usuario.id_usuario, this.usuario).subscribe(
    (res: any) => {
        this.toastr.success(res);
    },
    err => {
      this.toastr.error(err);
    }
  );
}
}
