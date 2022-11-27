import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PartidoService } from '../../../servicios/partido.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  nombreColumnas=["ID","Nombre","Lema","Opciones"];
  listadoPartidos=[];

  constructor(private miServicioPartido: PartidoService,
    private router: Router) { 

  }

  ngOnInit(): void {
    this.listarTodosLosPartidos();
  }

  listarTodosLosPartidos(){
    this.miServicioPartido.listarPartido().subscribe(
      data =>{
        this.listadoPartidos=data;
      }
    );
  }

  modificarPartido(idPartido: string){
    this.router.navigateByUrl("pages/partido/actualizar/"+idPartido);
  }

  crearPartido(){
    this.router.navigateByUrl("pages/partido/crear");
  }

  eliminarPartido(idPartido: string){
    Swal.fire({
      title: 'Eliminar Partido',
      text: "Seguro que desea eliminar el Partido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#276DD1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result)=>{
      if(result.isConfirmed){
        this.miServicioPartido.eliminarPartido(idPartido).subscribe(
          data =>{
            Swal.fire({
              icon: 'success',
              title: 'Partido eliminada',
              showConfirmButton: true
            })

            this.router.navigateByUrl("pages/partido/listar");
          }
        );
      }
    })
  }



}
