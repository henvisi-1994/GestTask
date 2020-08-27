import { GruposService } from 'src/app/services/grupos.service';
import { ActividadesService } from './../../../services/actividades.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Actividad } from 'src/app/models/Actividad.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  closeResult: string;
  edit = false;
  actividades: any;
  actividad: Actividad = {
    id_act: 0,
    nom_act: '',
    id_grupo: 0,
    fecha_act: new Date()
  };
  public grupos: any;
  constructor(public modalService: NgbModal,
              public actividadServices: ActividadesService,
              public gruposService: GruposService,
              private toastr: ToastrService) { }
  @ViewChild('actividadModal', { static: false }) modal: ElementRef;

  ngOnInit(): void {
    this.getActividades();
    this.getGrupos();
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
  getActividades() {
    this.actividadServices.getActividads().subscribe(
      (res: any) => {
        this.actividades = res;
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  getGrupos() {
    this.gruposService.getGrupos().subscribe(
      (res: any) => {
        this.grupos = res;
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public editActividad(actividad: Actividad) {
    this.actividad.id_act = actividad.id_act;
    this.actividad.id_grupo = actividad.id_grupo;
    this.actividad.nom_act = actividad.nom_act;
    this.actividad.fecha_act = actividad.fecha_act;
    this.edit = true;
    this.modalService.open(this.modal);
  }
  public borrarActividad(id_act: number) {
    this.actividadServices.deleteActividad(id_act).subscribe(
      (res: any) => {
        this.getActividades();

      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public updateActividad() {
    this.actividadServices.updateActividad(this.actividad.id_act, this.actividad).subscribe(
      (res: any) => {
        this.getActividades();
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public saveActividad() {
    this.actividadServices.saveActividad(this.actividad).subscribe(
      (res: any) => {
          this.getActividades();
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public guardarActividad() {
    (this.edit ? this.updateActividad() : this.saveActividad());
  }

}
