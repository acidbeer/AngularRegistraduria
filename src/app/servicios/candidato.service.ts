import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidato } from '../modelos/candidato.model';
import { Partido } from '../modelos/partido.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient) { }

  listarCandidato(): Observable<Candidato[]>{
    return this.http.get<Candidato[]>(`${environment.url_api_gateway}/candidato`);
  }

  buscarCandidatoporId(idCandidato: string): Observable<Candidato>{
    return this.http.get<Candidato>(`${environment.url_api_gateway}/candidato/${idCandidato}`);
  }

  crearCandidato(infoCandidato: Candidato): Observable<Candidato>{
    return this.http.post<Candidato>(`${environment.url_api_gateway}/candidato`,infoCandidato);
  }

  modificarCandidato(infoCandidato: Candidato, idCandidato: string): Observable<Candidato>{
    return this.http.put<Candidato>(`${environment.url_api_gateway}/candidato/${idCandidato}`,infoCandidato);
  }

  eliminarCandidato(idCandidato: string){
    return this.http.delete<Candidato>(`${environment.url_api_gateway}/candidato/${idCandidato}`);
  }

  
  


}
