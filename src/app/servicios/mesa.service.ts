import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mesa } from '../modelos/mesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private http:HttpClient) { }

  listarMesa(): Observable<Mesa[]>{
    return this.http.get<Mesa[]>(`${environment.url_api_gateway}/mesa`);
  }

  buscarMesaPorId(idMesa: string): Observable<Mesa>{
    return this.http.get<Mesa>(`${environment.url_api_gateway}/mesa/${idMesa}`);
  }

  crearMesa(infoMesa: Mesa): Observable<Mesa>{
    return this.http.post<Mesa>(`${environment.url_api_gateway}/mesa`, infoMesa);
  }

  modificarMesa(infoMesa: Mesa, idMesa: string):Observable<Mesa>{
    return this.http.put<Mesa>(`${environment.url_api_gateway}/mesa/${idMesa}`, infoMesa);
  }

  eliminarMesa(idMesa: string): Observable<Mesa>{
    return this.http.delete<Mesa>(`${environment.url_api_gateway}/mesa/${idMesa}`);
  }


}
