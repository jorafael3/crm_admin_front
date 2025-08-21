import { Routes } from '@angular/router';
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { CustomerOrderReportComponent } from "./usuarios2/customer-order-report.component";

export const mantenimientoRoutes: Routes = [
    {
        path: 'usuarios',
        component: CustomerOrderReportComponent,
        data: {
            title: 'Usuarios',
            breadcrumb: 'Usuarios'
        }
    },
];
