import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApiService } from '../base-api.service';
import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, UsuarioListResponse, UsuarioResponse } from '../../models/usuario.model';
import { ApiResponse } from '../../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService extends BaseApiService {

    private readonly endpoint = environment.apiUrl + '/mantenimiento/UsuarioAdmin/';

    constructor(http: HttpClient) {
        super(http);
    }



    /**
     * Obtener datos de sesión del usuario actual
     */
    getUserSessionData() {
        const token = localStorage.getItem('authToken') || localStorage.getItem('token') || '';
        const user = localStorage.getItem('user') || '';
        const userId = localStorage.getItem('userId') || '';

        // Parsear el usuario si está en formato JSON
        let userData = null;
        try {
            if (user) {
                userData = JSON.parse(user);
            }
        } catch (error) {
            console.warn('Error parsing user data from localStorage:', error);
            userData = user; // Si no es JSON, usar como string
        }

        return token
    }

    /**
     * Obtener lista de usuarios
     */
    // getUserList(userData: {}): Observable<any> {
    //     const headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${this.getUserSessionData()}`
    //     });
    //     return this.post<any>(this.endpoint, userData, { headers });
    // }

    /**
     * Enviar petición libre a cualquier endpoint
     */
    getUserList(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getUserSessionData()}`
        });
        return this.http.post<any>(this.endpoint + "getAllUsers", data, { headers });
    }

    // /**
    //  * Obtener usuario por ID
    //  */
    // getUserById(id: number): Observable<ApiResponse<UsuarioResponse>> {
    //     return this.get<ApiResponse<UsuarioResponse>>(`${this.endpoint}/${id}`);
    // }

    // /**
    //  * Crear nuevo usuario
    //  */
    // createUser(userData: CreateUsuarioRequest): Observable<ApiResponse<UsuarioResponse>> {
    //     return this.post<ApiResponse<UsuarioResponse>>(this.endpoint, userData);
    // }

    // /**
    //  * Actualizar usuario
    //  */
    // updateUser(id: number, userData: UpdateUsuarioRequest): Observable<ApiResponse<UsuarioResponse>> {
    //     return this.put<ApiResponse<UsuarioResponse>>(`${this.endpoint}/${id}`, userData);
    // }

    // /**
    //  * Eliminar usuario
    //  */
    // deleteUser(id: number): Observable<ApiResponse<any>> {
    //     return this.delete<ApiResponse<any>>(`${this.endpoint}/${id}`);
    // }

    // /**
    //  * Obtener perfil del usuario actual
    //  */
    // getCurrentUserProfile(): Observable<ApiResponse<UsuarioResponse>> {
    //     return this.get<ApiResponse<UsuarioResponse>>(`${this.endpoint}/profile`);
    // }

    // /**
    //  * Cambiar estado de usuario (activar/desactivar)
    //  */
    // changeUserStatus(id: number, estado: string): Observable<ApiResponse<UsuarioResponse>> {
    //     return this.put<ApiResponse<UsuarioResponse>>(`${this.endpoint}/${id}/status`, { estado });
    // }
}