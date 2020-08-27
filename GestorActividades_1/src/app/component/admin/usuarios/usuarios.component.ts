import { Usuario } from './../../../models/Usuario.model';
import { UsuariosService } from './../../../services/usuarios.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  closeResult: string;
  edit = false;
  usuario: Usuario = {
    id_user: 0,
    nombres_user: '',
    apellidos_user: '',
    email_user: '',
    celular_user: '',
    user_git_user: '',
    tipo_user: '',
    contrasena_user: '',
  };
  usuarios: any;

  constructor(public modalService: NgbModal,
              private usuarioService: UsuariosService,
              private toastr: ToastrService ) { }
  @ViewChild('usuarioModal', { static: false }) modal: ElementRef;
  ngOnInit(): void {
    this.getUsuarios();
  }
 // Boton para abrir ventana modal
 open(content) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
 // Cierra Ventana modal
 private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
// Lena arreglo de productos
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

public editUsuario(usuario: Usuario) {
  this.usuario.nombres_user = usuario.nombres_user;
  this.usuario.apellidos_user = usuario.apellidos_user;
  this.usuario.email_user = usuario.email_user;
  this.usuario.celular_user = usuario.celular_user;
  this.usuario.user_git_user = usuario.user_git_user;
  this.usuario.contrasena_user = usuario.contrasena_user;
  this.usuario.tipo_user = usuario.tipo_user;
  this.edit = true;
  this.modalService.open(this.modal);
}
// tslint:disable-next-line: variable-name
public borrarUsuario(id_user: number) {
  this.usuarioService.deleteUsuario(id_user).subscribe(
    (res: any) => {
        this.getUsuarios();
    },
    err => {
      this.toastr.error(err);
    }
  );
}
public saveUsuario() {
  this.usuarioService.saveUsuario(this.usuario).subscribe(
    (res: any) => {
      this.toastr.success('Usuario Registrado exitosamente');
      this.getUsuarios();
    },
    err => {
        this.toastr.error(err);
    }
  );
}
public updateusuario() {
  this.usuarioService.updateUsuario(this.usuario.id_user, this.usuario).subscribe(
    (res: any) => {
      this.getUsuarios();
    },
    err => {
      this.toastr.error(err);
    }
  );
}
public guardarUsuario() {
  (this.edit ? this.updateusuario() : this.saveUsuario());
}
}
