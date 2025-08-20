import { Routes } from '@angular/router';
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { CustomerOrderReportComponent } from "./usuarios2/customer-order-report.component";

export const mantenimientoRoutes: Routes = [
    {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
            title: 'Usuarios',
            breadcrumb: 'Usuarios'
        }
    },
     {
        path: 'usuarios2',
        component: CustomerOrderReportComponent,
        data: {
            title: 'Usuarios',
            breadcrumb: 'Usuarios'
        }
    },
];
