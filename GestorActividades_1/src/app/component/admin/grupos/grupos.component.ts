import { Grupo } from './../../../models/Grupo.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GruposService } from 'src/app/services/grupos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  closeResult: string;
  edit = false;
  grupo: Grupo = {
    id_grupo: 0,
    nombre_grupo: ''
  };
  grupos: any;
  constructor(public modalService: NgbModal,
              public gruposService: GruposService,
              private toastr: ToastrService) { }
  @ViewChild('grupoModal', { static: false }) modal: ElementRef;

  ngOnInit(): void {
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
  getGrupos() {
    this.gruposService.getGrupos().subscribe(
      (res: any) => {
        this.grupos = res;
      },
      err =>{
        this.toastr.error(err);
      }
    );
  }
  saveGrupo() {
    delete this.grupo.id_grupo;
    this.gruposService.saveGrupo(this.grupo).subscribe(
      (res: any) => {
        this.getGrupos();
        this.modalService.dismissAll();
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public editGrupo(grupo: Grupo) {
      this.grupo.id_grupo = grupo.id_grupo;
      this.grupo.nombre_grupo = grupo.nombre_grupo;
      this.edit = true;
      this.modalService.open(this.modal);
  }
  // tslint:disable-next-line: variable-name
  public borrarGrupo(id_grupo: number) {
      this.gruposService.deleteGrupo(id_grupo).subscribe(
        (res: any) => {
          this.getGrupos();
        },
        err => {
          this.toastr.error(err);
        }
      );
  }
  public updateGrupo() {
    this.gruposService.updateGrupo(this.grupo.id_grupo, this.grupo).subscribe(
      (res: any) => {
        this.getGrupos();
      },
      err => {
        this.toastr.error(err);
      }
    );
  }
  public guardarGrupo() {
    (this.edit ? this.updateGrupo() : this.saveGrupo());
  }
}
