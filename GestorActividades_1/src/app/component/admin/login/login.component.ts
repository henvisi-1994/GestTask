import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  token = '';
  tipo = [];
  constructor(private usuarioService: UsuariosService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  public logear() {
    // Envia datos de NgModel de aporte a servicio de aporte para añadir en bd
    this.usuarioService.loginUsuario(this.usuario).subscribe(
      // Ejecuta  luego de recibir respuesta del servicio de aporte  y almacena en res
      res => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        this.tipousuario();
      },
      // Errores al enviar datos al servicio de aporte almacenado en  err
      err => {
         this.toastr.error(err.error.message);

      }
    );
  }
  tipousuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        const tipo_usuario = res[0].tipo_user;
        localStorage.setItem('tipo_usuario', tipo_usuario);
        if (tipo_usuario === 'administrador') {
          this.router.navigate(['/admin/']);
        } else {
            this.router.navigate(['/home']);
        }
      },
      err => {
        this.toastr.error(err);
      }
    );

  }

}
