import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Partido } from '../modelos/partido.model';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(private http:HttpClient) { }

  listarPartido():Observable<Partido[]>{
    return this.http.get<Partido[]>(`${environment.url_api_gateway}/partidos`);
  }

  buscarPartidoPorId(idPartido: string): Observable<Partido>{
    return this.http.get<Partido>(`${environment.url_api_gateway}/partidos/${idPartido}`);
  }

  crearPartido(infoPartido: Partido):Observable<Partido>{
    return this.http.post<Partido>(`${environment.url_api_gateway}/partidos`,infoPartido);
  }

  modificarPartido(infoPartido: Partido,idPartido: string):Observable<Partido>{
    return this.http.put<Partido>(`${environment.url_api_gateway}/partidos/${idPartido}`,infoPartido);
  }

  eliminarPartido(idPartido: string):Observable<Partido>{
    return this.http.delete<Partido>(`${environment.url_api_gateway}/partidos/${idPartido}`);
  }


}
