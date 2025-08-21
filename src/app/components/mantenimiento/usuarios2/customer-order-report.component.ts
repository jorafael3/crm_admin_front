import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { TableConfigs, TableClickedAction, CustomButton } from '../../../shared/interface/common';
import { UsuariosService } from '../../../services/mantenimiento/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-order-report',
  imports: [CommonModule, FormsModule, CardComponent, TableComponent],
  templateUrl: './customer-order-report.component.html',
  styleUrl: './customer-order-report.component.scss'
})
export class CustomerOrderReportComponent {
  public Usuarios_Datos: any[] = [];
  public isLoading = false;

  fechaPersonalizadaInicio: string = '';
  fechaPersonalizadaFin: string = '';


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

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Usuario', field_value: 'usuario', sort: true },
      { title: 'Email', field_value: 'email', sort: true },
      { title: 'Empresa', field_value: 'empresa', sort: true },
      { title: 'Estado', field_value: 'estado', sort: true },
    ],
    row_action: [
      {
        label: '',
        action_to_perform: 'edit_user',
        icon: 'edit',
        type: 'button',
        class: 'btn btn-light btn-sm',
        tooltip: 'Editar usuario'
      },
      {
        label: '',
        action_to_perform: 'contact_customer',
        icon: 'envelope',
        type: 'button',
        class: 'btn btn-success btn-sm',
        tooltip: 'Contactar usuario por email'
      },
      {
        label: '',
        action_to_perform: 'delete_user',
        icon: 'trash',
        type: 'button',
        class: 'btn btn-danger btn-sm ms-1',
        tooltip: 'Eliminar usuario'
      }
    ],
    data: []
  };

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

    this.usuariosService.getUserList(param).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Forzar cambio de referencia para disparar ngOnChanges en TableComponent
          this.Usuarios_Datos = response.data;
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

    this.Usuarios_Datos.map(function (usuario) {
      usuario.estado = `<span class="badge badge-light-${usuario.estado == 'I' ? 'danger' : 'success'}">${(usuario.estado == 'I' ? 'Inactivo' : 'Activo')}</span>`;
    });

    this.tableConfig = { ...this.tableConfig, data: this.Usuarios_Datos };

  }
  onTableAction(action: TableClickedAction) {
    switch (action.action_to_perform) {
      case 'edit_user':
        this.editUser(action.data);
        break;
      case 'contact_customer':
        this.contactCustomer(action.data);
        break;
      case 'delete_user':
        this.deleteUser(action.data);
        break;
      default:
    }
  }

  private editUser(user: any) {
    console.log("🚀 ~ CustomerOrderReportComponent ~ editUser ~ user:", user);
    // Aquí puedes abrir un modal de edición o navegar a una página de edición
    alert(`Editar usuario: ${user.usuario}\nEmail: ${user.email}`);
  }

  private viewCustomerOrders(customer: any) {
    alert(`Ver pedidos de: ${customer.customer_name}`);
  }

  private contactCustomer(user: any) {
    console.log("🚀 ~ CustomerOrderReportComponent ~ contactCustomer ~ user:", user);
    // Aquí puedes abrir un modal de composición de email o usar mailto:
    if (user.email) {
      window.open(`mailto:${user.email}?subject=Contacto desde CRM&body=Hola ${user.usuario},`);
    } else {
      alert(`No hay email disponible para ${user.usuario}`);
    }
  }

  private deleteUser(user: any) {
    console.log("🚀 ~ CustomerOrderReportComponent ~ deleteUser ~ user:", user);

    // Confirmación antes de eliminar
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario "${user.usuario}"?\n\nEsta acción no se puede deshacer.`)) {
      // Aquí llamarías al servicio para eliminar
      // this.usuariosService.deleteUser(user.id_usuario).subscribe({...});
      alert(`Usuario "${user.usuario}" eliminado correctamente`);
      // Recargar la tabla después de eliminar
      this.loadTableData();
    }
  }

  onCustomAction(event: { action: string, data?: any }) {
    switch (event.action) {
      case 'refresh':
        this.onRefreshTableData();
        break;
      case 'create_user':
        this.onCreateUser();
        break;
      default:
    }
  }

  onRefreshTableData() {
    console.log('Refrescando datos de la tabla...');
    this.loadTableData();
  }

  onCreateUser() {
    Swal.fire("Error!", "Sorry, looks like some data are not filled, please try again !", "error")

  }
}
