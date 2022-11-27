import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CandidatoService } from '../../../servicios/candidato.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  nombreColumnas = ["Cedula","Numero_resolucion","Nombre","Apellido","Opciones"];
  listadoCandidatos=[];
  constructor(private miServicioCandidatos:CandidatoService,
    private router:Router) { }

  ngOnInit(): void {
    this.listarTodosLosCandidatos();
  }

  listarTodosLosCandidatos(){
    this.miServicioCandidatos.listarCandidato().subscribe(
      data => {
        this.listadoCandidatos = data;
      }
    );
  }

  editarCandidato(idCandidato:string){
    this.router.navigateByUrl("pages/candidato/actualizar/"+ idCandidato);
  }

  crearCandidato(){
    this.router.navigateByUrl("pages/candidato/crear");
  }




  eliminarCandidato(idCandidato: string){

    Swal.fire({
      title: 'Eliminar Candidato',
      text: "Seguro que desea eliminar el candidato?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#276DD1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if(result.isConfirmed){
        this.miServicioCandidatos.eliminarCandidato(idCandidato).subscribe(
          data => {
            Swal.fire({
              icon: 'success',
              title: 'Candidato eliminado',
              showConfirmButton: true
            })
            this.router.navigateByUrl("pages/candidato/listar") 
          }
          
        );
        

      }

    })

  }

}
