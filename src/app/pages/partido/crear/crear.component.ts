import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Partido } from '../../../modelos/partido.model';
import { PartidoService } from '../../../servicios/partido.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean=true;
  intentoEnvio: boolean=false;
  infoPartido: Partido ={
    nombre:"",
    lema:""
  };

  constructor(private miServicioPartido: PartidoService,
    private router: Router,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.idPartido){
      this.modoCreacion=false;
      this.infoPartido._id = this.rutaActiva.snapshot.params.idPartido;
      this.buscarPartido(this.infoPartido._id);
    }else{
      this.modoCreacion=true;
    }

  }

  buscarPartido(idPartido:string){
    this.miServicioPartido.buscarPartidoPorId(this.infoPartido._id).subscribe(
      data =>{
        this.infoPartido=data;
      }
    );
  }

  modificarPartidos(){
    let camposValidos= this.validarCampos();

    if(camposValidos){
      this.miServicioPartido.modificarPartido(this.infoPartido,this.infoPartido._id).subscribe(
        
        data => {
          Swal.fire({
            icon:'success',
            title: 'Partido Actualizado!',
            showConfirmButton: true
          })

          this.router.navigateByUrl("/pages/partido/listar");
        }
      );
    }


  }

  validarCampos(){
    this.intentoEnvio=true;
    if(this.infoPartido._id=="" || this.infoPartido.nombre==""  || this.infoPartido.lema==""){

      return false;
    }else{
      return true;
    }
  }

  crearPartido(){

    let camposValidos=this.validarCampos();

    if(camposValidos){
      this.miServicioPartido.crearPartido(this.infoPartido).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Partido Creado !',
            showConfirmButton: true
          })
  
          this.router.navigateByUrl("pages/partido/listar")
        }
      );

    }
  }


}
