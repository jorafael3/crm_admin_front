import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserProfileService } from '../../../../../services/users/user-profile.service';

import { FeatherIconComponent } from "../../../ui/feather-icon/feather-icon.component";
import { profile } from '../../../../data/header';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, FeatherIconComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent {

  public profile = profile;

  constructor(
    private router: Router,
    private authService: AuthService,
    public userProfileService: UserProfileService
  ) { }

  logOut() {
    console.log('Logging out user...');
    
    // Usar el servicio de autenticación para logout
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        // La navegación se maneja automáticamente en el AuthService
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Incluso si hay error en la API, limpiar sesión local
        this.forceLogout();
      }
    });
  }

  /**
   * Forzar logout en caso de error
   */
  private forceLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Obtener nombre del usuario actual
   */
  getCurrentUserName(): string {
    return this.userProfileService.getDisplayName();
  }

  /**
   * Obtener iniciales del usuario para avatar
   */
  getUserInitials(): string {
    return this.userProfileService.getAvatarOrInitials();
  }

  /**
   * Obtener rol del usuario
   */
  getUserRole(): string {
    return this.userProfileService.getRoleDisplayName();
  }
  
}
