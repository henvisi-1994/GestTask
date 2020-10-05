import { WebSocketService } from './../../../services/web-socket.service';
import { ActividadesService } from './../../../services/actividades.service';
import { AsignacionActividaService } from './../../../services/asignacion-activida.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rev-activ',
  templateUrl: './rev-activ.component.html',
  styleUrls: ['./rev-activ.component.css']
})
export class RevActivComponent implements OnInit {
  usuario: any;
  actividades: any;
  closeResult: string;
  comentario: any = {
    id_act: 0,
    comentario_act: ''
  };
  event_name = 'enviar-mensaje';
  username: string;
  mensajes: any = [];
  userchat = {
    user: '',
    message: ''
  };


  constructor(public modalService: NgbModal,
              private usuarioService: UsuariosService,
              private asignacionActividaService: AsignacionActividaService,
              private actividadesService: ActividadesService,
              private webService: WebSocketService,
              private toastr: ToastrService) { }
  @ViewChild('comentarioModal', { static: false }) modal: ElementRef;
  ngOnInit(): void {
    this.getUsuario();
    this.username = localStorage.getItem('username');
    this.userchat.user = this.username;
    this.webService.listen('enviar-texto').subscribe((data) => {
         this.mensajes = data;
    });
  }
  public mismensajes() {
    this.webService.emit(this.event_name, this.userchat);
    this.userchat.message = '';
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
  getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        localStorage.setItem('username', res[0].nombres_user);
        this.getActividades(res[0].id_user);
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  // tslint:disable-next-line: variable-name
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
  public comentar(id_act: number) {
    this.comentario.id_act = id_act;
    this.modalService.open(this.modal);
  }
  public comentarActividad() {

    this.actividadesService.comentarActividad(this.comentario.id_act, this.comentario).subscribe(
      (res: any) => {
        this.modalService.dismissAll();
        this.getUsuario();
        this.toastr.success(res);
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  // tslint:disable-next-line: variable-name
  finalizar(id_act: number) {
    this.eliminarasignacion(id_act);
    this.actividadesService.deshabilitarActividad(id_act).subscribe(
      (res: any) => {
        this.toastr.success(res);
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  // tslint:disable-next-line: variable-name
  eliminarasignacion(id_act: number) {
    this.asignacionActividaService.deleteAsig_activ(id_act).subscribe(
      (res: any) => {
        this.toastr.success(res);
      },
      err => {
        this.toastr.error(err);

      }
    );
  }
}
