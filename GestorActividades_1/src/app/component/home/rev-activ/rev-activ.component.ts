import { WebSocketService } from './../../../services/web-socket.service';
import { ActividadesService } from './../../../services/actividades.service';
import { AsignacionActividaService } from './../../../services/asignacion-activida.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComentariosService } from 'src/app/services/comentarios.service';

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
  // tslint:disable-next-line: variable-name
  event_name = 'enviar-mensaje';
  username: string;
  mensajes: any = [];
  userchat = {
    user: '',
    message: '',
    fecha_hora: ''
  };
  comentarios: any;
  grupos: any;
  vgrupo: boolean;
  grupo: any;
  id_grupo: number;


  constructor(public modalService: NgbModal,
    private comentarioService: ComentariosService,
    private usuarioService: UsuariosService,
    private asignacionActividaService: AsignacionActividaService,
    private actividadesService: ActividadesService,
    private webService: WebSocketService,
    private toastr: ToastrService) { }
  @ViewChild('comentarioModal', { static: false }) modal: ElementRef;
  ngOnInit(): void {
    this.getUsuario();
    this.getgrupos();
    this.username = localStorage.getItem('username');
    this.userchat.user = this.username;
    this.userchat.fecha_hora = this.fecha_horaAc();
    this.webService.listen('enviar-texto').subscribe((data) => {
      this.mensajes = data;
    });
  }
  verificarGrupos(grupos: any) {
    if (grupos.length > 1) {
      this.vgrupo = true;
    } else {
      this.vgrupo = false;
    }
    this.almacenar_grupos(grupos);
  }
  almacenar_grupos(grupos: any) {
    if (this.vgrupo) {
      this.grupos = grupos;
    } else {
      localStorage.setItem('grupo', grupos[0].id_grupo);
      this.getcomentarios();
    }
  }
  public seleccionarGrupo(event: any) {
    localStorage.setItem('grupo', event);
    this.getcomentarios();
  }
  public getgrupos() {
    this.usuarioService.getGrupoUsuario().subscribe(
      (res: any) => {
        this.grupos = res;
        this.verificarGrupos(res);
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  getcomentarios() {
    this.grupo = localStorage.getItem('grupo');
    this.comentarioService.getcomentariosGrupo(this.grupo).subscribe(
      (res: any) => {
        this.comentarios = res;
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public mismensajes() {
    this.webService.emit(this.event_name, this.userchat);
    this.userchat.message = '';
  }
  public fecha_horaAc() {
    let vDiaSemana: any;
    //   Variables para los datos
    // tslint:disable-next-line: one-variable-per-declaration
    const vFecha = new Date();
    vDiaSemana = vFecha.getDay();
    // tslint:disable-next-line: one-variable-per-declaration
    let vHora = vFecha.getHours(),
      // tslint:disable-next-line: prefer-const
      vMinutos = vFecha.getMinutes(),
      vYear = vFecha.getFullYear(),
      // tslint:disable-next-line: prefer-const
      vDia = vFecha.getDate(),
      // tslint:disable-next-line: prefer-const
      vMes = vFecha.getMonth(),
      vAmpm: string;
    // Muestra los elementos de la fecha en pantalla
    const semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    vDiaSemana = semana[vDiaSemana] + ', ';

    // tslint:disable-next-line: max-line-length
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    // Condicionales para colocar periodo la hora AM/PM
    if (vHora >= 12) {
      vHora = vHora - 12;
      vAmpm = 'PM';
    } else {
      vAmpm = 'AM';
    }
    // tslint:disable-next-line: triple-equals
    if (vHora == 0) {
      vHora = 12;
    }
    return `${vDia} de ${meses[vMes]} del ${vYear} ${vHora}:${vMinutos}`;
  }
  public formato(texto) {
    const fecha = texto.slice(0, -14);
    let horas = 0;
    // tslint:disable-next-line: quotemark
    const separador = 'T';
    const tiempop = texto.split(separador);
    const tiempot = tiempop[1].split('.')[0];
    if (Number(tiempot.split(':')[0]) < 5) {
      horas = Number(tiempot.split(':')[0]) + 19;
    } else {
      horas = Number(tiempot.split(':')[0]) - 5;
    }

    const minutos = tiempot.split(':')[1];
    const segundos = tiempot.split(':')[2];
    const tiempo = horas + ':' + minutos + ':' + segundos;
    return fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1') + ' ' + tiempo;
  }

  // Boton para abrir ventana modal
  open(content: any) {
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
        localStorage.setItem('username', res[0].user_git_user);
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
  // tslint:disable-next-line: variable-name
  public comentar(id_act: number) {
    this.comentario.id_act = id_act;
    this.modalService.open(this.modal);
  }
  public comentarActividad() {

    this.actividadesService.comentarActividad(this.comentario.id_act, this.comentario).subscribe(
      (res: any) => {
        this.modalService.dismissAll();
        this.getUsuario();
        this.getcomentarios();
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
