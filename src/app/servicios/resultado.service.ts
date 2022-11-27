import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resultado } from '../modelos/resultado.model';


@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private http: HttpClient) { }

  listarResultado(): Observable<Resultado[]>{
    return this.http.get<Resultado[]>(`${environment.url_api_gateway}/resultado`);
  }

  buscarResultadoPorId(idResultado: string): Observable<Resultado>{
    return this.http.get<Resultado>(`${environment.url_api_gateway}/resultado`);
  }

  modificarResultado(infoResultado: Resultado,idResultado: string): Observable<Resultado>{
    return this.http.put<Resultado>(`${environment.url_api_gateway}/resultado/${idResultado}`,infoResultado);
  }

  eliminarResultado(idResultado: string):Observable<Resultado>{
    return this.http.delete<Resultado>(`${environment.url_api_gateway}/resultado/${idResultado}`);
  }


}
