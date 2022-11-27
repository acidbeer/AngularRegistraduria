import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResultadoService } from '../../../servicios/resultado.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  nombreColumnas = ["ID","Numero_Mesa","Cedula_Candidato","Numero_Votos","Opciones"];
  listadoResultados=[];

  constructor(private miServicioResultado: ResultadoService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarTodosLosResultados();

  }

  listarTodosLosResultados(){
    this.miServicioResultado.listarResultado().subscribe(
      data => {
        this.listadoResultados = data;
      }
    );
  }


  modificarResultado(idResultado: string){
    this.router.navigateByUrl("pages/resultado/actualizar/"+idResultado);
  }

  crearResultado(){
    this.router.navigateByUrl("pages/resultado/crear");
  }

  eliminarResultado(idResultado: string){
    Swal.fire({
      title: 'Eliminar Resultado',
      text: "Seguro que desea eliminar el Resultado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#276DD1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result)=>{
      if(result.isConfirmed){
        this.miServicioResultado.eliminarResultado(idResultado).subscribe(
          data => {
            Swal.fire({
              icon: 'success',
              title: 'Resultado eliminada',
              showConfirmButton: true
            })
            this.router.navigateByUrl("pages/resultado/listar");
          }
        );

      }
      
    })
  }



}
