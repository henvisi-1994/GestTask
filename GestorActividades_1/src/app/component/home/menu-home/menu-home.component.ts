import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {
  esAdmin: boolean;
  eslogeado = false;
  usuario = {
    nombres_user: '',
    apellidos_user: '',
    tipo_user: ''
  };
  constructor(private usuarioService: UsuariosService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsuario();
  }
  public cerrarSesion() {
    this.usuarioService.cerrarSesion();
  }
  estalogeado() {
    // tslint:disable-next-line: variable-name
    const tipo_usuario = localStorage.getItem('tipo_usuario');
    if (tipo_usuario === 'administrador') {
      this.esAdmin = true;
    } else if (tipo_usuario === 'publico') {
      this.esAdmin = false;
    }
    this.eslogeado = this.usuarioService.estaLogeado();
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

}
