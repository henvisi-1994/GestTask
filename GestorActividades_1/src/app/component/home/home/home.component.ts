import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario = {
    nombres_user: '',
    apellidos_user: '',
    tipo_user: ''
  };

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
