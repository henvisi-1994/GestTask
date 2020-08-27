import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
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
  constructor(private usuarioService: UsuariosService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  public saveUsuario() {
    this.usuario.tipo_user = 'Integrante';
    this.usuarioService.saveUsuario(this.usuario).subscribe(
      (res: any) => {
        const token = res['token'];
        localStorage.setItem('token', token);
        localStorage.setItem('tipo_usuario', this.usuario.tipo_user);
        this.tipousuario(this.usuario.tipo_user);
      },
      err => {
          this.toastr.error(err);
      }
    );
  }
  // tslint:disable-next-line: variable-name
  tipousuario(tipo_user: string) {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.router.navigate(['/home']);
      },
      err => {
        this.toastr.error(err);
      }
    );

  }

}
