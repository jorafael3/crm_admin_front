import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { TableConfigs, TableClickedAction, CustomButton } from '../../../shared/interface/common';
import { UsuariosService } from '../../../services/mantenimiento/usuarios.service';
import { Usuario } from '../../../models/usuario.model';
import { ApiResponse } from '../../../models/auth.model';

@Component({
  selector: 'app-usuarios',
  imports: [CardComponent, TableComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public allUsuarios: Usuario[] = [];
  public isLoading = false;
  public sessionData: any = null; // Datos de sesión del usuario actual

  constructor(private usuariosService: UsuariosService) { }

  // Configuración de botones personalizados
  public customButtons: CustomButton[] = [
    {
      label: 'Nuevo Usuario',
      action: 'add_user',
      icon: 'fa fa-plus',
      class: 'btn btn-primary'
    },
    {
      label: '',
      action: 'refresh',
      icon: 'fa fa-refresh',
      class: 'btn btn-success'
    }
  ];

  // Configuración de la tabla
  public tableConfig: TableConfigs = {
    columns: [
      {
        title: 'ID',
        field_value: 'id',
        sort: true
      },
      {
        title: 'Nombre',
        field_value: 'nombre',
        sort: true
      },
      {
        title: 'Email',
        field_value: 'email',
        sort: true
      },
      {
        title: 'Rol',
        field_value: 'role',
        sort: true
      },
      {
        title: 'Estado',
        field_value: 'estado',
        sort: true,
        type: 'template',
        template: '<span class="status-badge estado">estado</span>'
      },
      {
        title: 'Fecha Creación',
        field_value: 'fecha_creacion',
        sort: true
      },
      {
        title: 'Último Acceso',
        field_value: 'ultimo_acceso',
        sort: true
      }
    ],
    row_action: [
      {
        label: 'Editar',
        action_to_perform: 'edit',
        icon: 'fa fa-edit',
        class: 'btn btn-primary btn-sm',
        modal: false
      },
      {
        label: 'Eliminar',
        action_to_perform: 'delete',
        icon: 'fa fa-trash',
        class: 'btn btn-danger btn-sm',
        modal: true,
        model_text: '¿Estás seguro de que quieres eliminar este usuario?'
      }
    ],
    data: []
  };

  ngOnInit(): void {
    this.loadSessionData();
    this.loadTableData();
  }

  // Cargar datos de sesión del usuario actual
  loadSessionData(): void {
    this.sessionData = this.usuariosService.getUserSessionData();
    console.log('Datos de sesión del usuario:', this.sessionData);
  }

  // Cargar datos de la tabla usando el servicio
  loadTableData(): void {
    this.isLoading = true;

    this.usuariosService.getUserList({}).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.usuarios = response.data.usuarios || [];
          this.allUsuarios = [...this.usuarios];
          this.tableConfig.data = this.usuarios;
          console.log('Usuarios cargados:', this.usuarios);
        } else {
          console.warn('No se pudieron cargar los usuarios:', response.message);
          this.loadMockData();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.isLoading = false;
        // Mostrar datos de ejemplo en caso de error
        this.loadMockData();
      }
    });
  }

  // Método auxiliar para cargar datos de ejemplo (fallback)
  private loadMockData(): void {

    // Simular datos de usuarios
    this.usuarios = [
      {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan.perez@email.com',
        role: 'Administrador',
        estado: 'Activo',
        fecha_creacion: '2024-01-15',
        ultimo_acceso: '2024-08-20'
      },
      {
        id: 2,
        nombre: 'María García',
        email: 'maria.garcia@email.com',
        role: 'Usuario',
        estado: 'Activo',
        fecha_creacion: '2024-02-10',
        ultimo_acceso: '2024-08-19'
      },
      {
        id: 3,
        nombre: 'Carlos López',
        email: 'carlos.lopez@email.com',
        role: 'Moderador',
        estado: 'Inactivo',
        fecha_creacion: '2024-03-05',
        ultimo_acceso: '2024-08-15'
      },
      {
        id: 4,
        nombre: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        role: 'Usuario',
        estado: 'Suspendido',
        fecha_creacion: '2024-04-20',
        ultimo_acceso: '2024-08-10'
      },
      {
        id: 5,
        nombre: 'Luis Rodríguez',
        email: 'luis.rodriguez@email.com',
        role: 'Administrador',
        estado: 'Activo',
        fecha_creacion: '2024-05-12',
        ultimo_acceso: '2024-08-20'
      }
    ];

    this.allUsuarios = [...this.usuarios];
    this.tableConfig.data = this.usuarios;
    this.isLoading = false;
  }

  // Manejar acciones de la tabla
  onTableAction(event: TableClickedAction): void {
    switch (event.action_to_perform) {
      case 'edit':
        this.editUser(event.data);
        break;
      case 'delete':
        this.deleteUser(event.data);
        break;
    }
  }

  // Manejar acciones personalizadas
  onCustomAction(event: { action: string, data?: any }): void {
    switch (event.action) {
      case 'add_user':
        this.addUser();
        break;
      case 'refresh':
        this.refreshTableData();
        break;
    }
  }

  // Agregar nuevo usuario
  private addUser(): void {
    console.log('Agregar nuevo usuario');
    // Aquí implementarías la lógica para agregar un usuario
  }

  // Editar usuario
  private editUser(user: Usuario): void {
    console.log('Editar usuario:', user);
    // Aquí implementarías la lógica para editar un usuario
  }

  // Eliminar usuario
  private deleteUser(user: Usuario): void {
    console.log('Eliminar usuario:', user);

    // Mostrar confirmación
    // if (confirm(`¿Estás seguro de que quieres eliminar al usuario ${user.nombre}?`)) {
    //   this.usuariosService.deleteUser(user.id).subscribe({
    //     next: (response) => {
    //       if (response.success) {
    //         console.log('Usuario eliminado exitosamente:', response.message);
    //         // Remover el usuario de la lista local
    //         this.usuarios = this.usuarios.filter(u => u.id !== user.id);
    //         this.allUsuarios = this.allUsuarios.filter(u => u.id !== user.id);
    //         this.tableConfig.data = this.usuarios;
    //       } else {
    //         console.error('Error al eliminar usuario:', response.message);
    //         alert('Error al eliminar el usuario: ' + response.message);
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error al eliminar usuario:', error);
    //       alert('Error al eliminar el usuario. Por favor, inténtalo de nuevo.');
    //     }
    //   });
    // }
  }

  // Refrescar datos de la tabla
  private refreshTableData(): void {
    console.log('Refrescando datos...');
    this.loadTableData();
  }
}
