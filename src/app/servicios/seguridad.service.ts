import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from 'http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  elUsuario= new BehaviorSubject<Usuario>(new Usuario);

  constructor(private http: HttpClient ) { 
    this.validarSesion();
  }

  public get usuarioSesionActiva(): Usuario {
    return this.elUsuario.value;
  }

  setUsuario(infoUsuario: Usuario){
    this.elUsuario.next(infoUsuario);
  }

  getUsuario(){
    return this.elUsuario.asObservable();
  }

  guardardatosSesion(infoUsuario: Usuario){
    localStorage.setItem('sesion',JSON.stringify(infoUsuario)); 
    this.setUsuario(infoUsuario);
  }

  eliminarDatosSesion(){
    localStorage.removeItem('sesion');
    this.setUsuario(new Usuario());
  }

  obtenerDatosSesion() {
    return localStorage.getItem('sesion');
  }

  validarSesion(): boolean {
    let sesionActual = this.obtenerDatosSesion();
    if(sesionActual){
      this.setUsuario(JSON.parse(sesionActual));
    }
    return sesionActual != null ? true : false;
  }
    
  

  login(infoUsuario: Usuario):Observable<Usuario> {

    return this.http.post<Usuario>(`${environment.url_api_gateway}/login`,infoUsuario);
  }
}
