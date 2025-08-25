import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { TableConfigs, TableClickedAction, CustomButton } from '../../../shared/interface/common';
import { UsuariosService } from '../../../services/empresas/planes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-order-report',
  imports: [CommonModule, FormsModule, CardComponent, TableComponent],
  templateUrl: './customer-order-report.component.html',
  styleUrl: './customer-order-report.component.scss'
})
export class PlanesComponent {
  showCreateModal: boolean = false;
  usuarioNuevo: any = {};

  showEditModal: boolean = false;
  usuarioEditando: any = null;
  public Usuarios_Datos: any[] = [];
  public isLoading = false;

  fechaPersonalizadaInicio: string = '';
  fechaPersonalizadaFin: string = '';
  Buttons_Export = ['excel', 'pdf'];

  datos_planes: any[] = [];

  public tablePlanesConfig: TableConfigs = {
    columns: [
      { title: 'Plan', field_value: 'plan_nombre', sort: true },
      { title: 'Periodo', field_value: 'periodo_nombre', sort: true },
      { title: 'Precio', field_value: 'precio', sort: true },
      { title: 'Usuarios', field_value: 'max_usuarios', sort: true },
      { title: 'Documentos', field_value: 'max_documentos', sort: true },
      { title: 'Almacenamiento (GB)', field_value: 'max_almacenamiento', sort: true }
    ],
    row_action: [],
    data: []
  };

  public customButtons: CustomButton[] = [
    {
      label: '',
      action: 'refresh',
      icon: 'fa fa-refresh',
      class: 'btn btn-success',
      tooltip: 'Actualizar datos de la tabla'
    },
    {
      label: '',
      action: 'create_user',
      icon: 'fa fa-plus',
      class: 'btn btn-info',
      tooltip: 'Crear nuevo usuario'
    },

  ];


  constructor(private usuariosService: UsuariosService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Inicializar fechas personalizada con el inicio de mes y la fecha actual
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    this.fechaPersonalizadaInicio = inicioMes.toISOString().slice(0, 10);
    this.fechaPersonalizadaFin = hoy.toISOString().slice(0, 10);
    this.loadTableData();
  }

  private loadTableData() {
    this.isLoading = true;
    let param = {
      fecha_inicial: this.fechaPersonalizadaInicio,
      fecha_final: this.fechaPersonalizadaFin
    };
    console.log('param: ', param);

    this.usuariosService.getPlanes(param).subscribe({
      next: (response) => {
        console.log('response: ', response);
        if (response.success && response.data) {
          this.datos_planes = response.data;
          this.OnFillTableAction();
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 0);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  OnFillTableAction() {

    // this.Usuarios_Datos.map(function (usuario) {
    // usuario.estado = `<span class="badge badge-light-${usuario.estado == 'I' ? 'danger' : 'success'}">${(usuario.estado == 'I' ? 'Inactivo' : 'Activo')}</span>`;
    // });

    this.tablePlanesConfig = { ...this.tablePlanesConfig, data: this.datos_planes };
        
  }

  onTableAction(action: TableClickedAction) {
    //   switch (action.action_to_perform) {
    //     case 'edit_user':
    //       this.editUser(action.data);
    //       break;
    //     case 'contact_customer':
    //       this.contactCustomer(action.data);
    //       break;
    //     case 'delete_user':
    //       this.deleteUser(action.data);
    //       break;
    //     default:
    //   }
  }



  onCustomAction(event: { action: string, data?: any }) {
    switch (event.action) {
      case 'refresh':
        this.onRefreshTableData();
        break;
      case 'create_user':
        // this.onCreateUser();
        break;
      default:
    }
  }

  onRefreshTableData() {
    console.log('Refrescando datos de la tabla...');
    this.loadTableData();
  }


}
