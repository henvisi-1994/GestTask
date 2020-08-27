import { AsignacionActividaService } from './../../../services/asignacion-activida.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rev-activ',
  templateUrl: './rev-activ.component.html',
  styleUrls: ['./rev-activ.component.css']
})
export class RevActivComponent implements OnInit {
  usuario: any;
  actividades: any;

  constructor(private usuarioService: UsuariosService,
              private asignacionActividaService: AsignacionActividaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsuario();
  }
  getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.getActividades(res[0].id_user);
      },
      err => {
        this.toastr.error(err);
      }
    );
}
getActividades(id_usuario: number) {
  this.asignacionActividaService.getAsig_actividadesUsuario(id_usuario).subscribe(
    (res: any) => {
      this.actividades = res;
    }
  );
}
public formato(texto) {
  const fecha = texto.slice(0, -14);
  const tiempo = texto.slice(0, -12);
  return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
}

}
