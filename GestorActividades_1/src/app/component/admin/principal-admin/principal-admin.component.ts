import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit {

  usuario: any;

  constructor(private usuarioService: UsuariosService, private toastr: ToastrService) { }

  ngOnInit() {
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

}
