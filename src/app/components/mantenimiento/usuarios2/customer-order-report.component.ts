import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { TableConfigs, TableClickedAction, CustomButton } from '../../../shared/interface/common';
import { UsuariosService } from '../../../services/mantenimiento/usuarios.service';

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
      action: 'send_email',
      icon: 'fa fa-envelope',
      class: 'btn btn-info',
      tooltip: 'Enviar reporte por email'
    },
    {
      label: '',
      action: 'generate_report',
      icon: 'fa fa-chart-bar',
      class: 'btn btn-warning',
      tooltip: 'Generar reporte personalizado'
    },
    {
      label: '',
      action: 'clear_filters',
      icon: 'fa fa-times',
      class: 'btn btn-secondary',
      tooltip: 'Limpiar filtros de fecha'
    }
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
        label: 'Ver Pedidos',
        action_to_perform: 'view_orders',
        icon: 'eye',
        type: 'button',
        class: 'btn btn-info btn-sm me-2'
      },
      {
        label: 'Contactar',
        action_to_perform: 'contact_customer',
        icon: 'message',
        type: 'button',
        class: 'btn btn-success btn-sm'
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
          this.tableConfig = { ...this.tableConfig, data: response.data };
          this.Usuarios_Datos = response.data;
          console.log('Datos para la tabla:', this.tableConfig.data);
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

  onTableAction(action: TableClickedAction) {
    switch (action.action_to_perform) {
      case 'view_orders':
        this.viewCustomerOrders(action.data);
        break;
      case 'contact_customer':
        this.contactCustomer(action.data);
        break;
      default:
    }
  }

  private viewCustomerOrders(customer: any) {
    alert(`Ver pedidos de: ${customer.customer_name}`);
  }

  private contactCustomer(customer: any) {
    alert(`Contactar a: ${customer.customer_name}\nEmail: ${customer.customer_email}`);
  }

  onCustomAction(event: { action: string, data?: any }) {
    switch (event.action) {
      case 'refresh':
        this.loadTableData();
        break;
      default:
    }
  }

  onRefreshTableData() {
    console.log('Refrescando datos de la tabla...');
    this.loadTableData();
  }


}
