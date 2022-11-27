import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MesaService } from '../../../servicios/mesa.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  nombreColumnas=["Numero","Cantidad_inscritos","Opciones"];
  listadoMesas=[];


  constructor(private miServicioMesa:MesaService, private router: Router) { 

  }

  ngOnInit(): void {
    this.listarTodasLasMesas();
  }

  listarTodasLasMesas(){
    this.miServicioMesa.listarMesa().subscribe(
      data =>{
        this.listadoMesas=data;
      }
    );
  }

  modificarMesa(idMesa:string){
    this.router.navigateByUrl("pages/mesa/actualizar/"+idMesa);
  }

  crearMesa(){
    this.router.navigateByUrl("pages/mesa/crear");
  }

  eliminarMesa(idMesa:string){
    Swal.fire({
      title: 'Eliminar Mesa',
      text: "Seguro que desea eliminar la Mesa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#276DD1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result)=>{
      if(result.isConfirmed){
        this.miServicioMesa.eliminarMesa(idMesa).subscribe(
          data =>{
            Swal.fire({
              icon: 'success',
              title: 'Mesa eliminada',
              showConfirmButton: true
            })

            this.router.navigateByUrl("pages/mesa/listar");
          }
        );
      }
    })
  }

}
