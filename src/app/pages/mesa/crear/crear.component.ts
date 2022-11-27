import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Mesa } from '../../../modelos/mesa.model';
import { MesaService } from '../../../servicios/mesa.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean= true;
  intentoEnvio: boolean= false;
  infoMesa: Mesa={
    numero:"",
    cantidad_inscritos:""
  };

  
  constructor(private miServicioMesa: MesaService,
    private router:Router,
    private rutaActiva:ActivatedRoute) {}

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.idMesa){
      this.modoCreacion = false;
      this.infoMesa._id = this.rutaActiva.snapshot.params.idMesa;
      this.buscarMesa(this.infoMesa._id);
    }else{
      this.modoCreacion=true;
    }
  }

  buscarMesa(idMesa: string){
    this.miServicioMesa.buscarMesaPorId(this.infoMesa._id).subscribe(
      data => {
        this.infoMesa=data;
      }
    );
  }

  modificarMesa(){

    let camposValidos= this.validarCampos();

    if(camposValidos){
      this.miServicioMesa.modificarMesa(this.infoMesa,this.infoMesa._id).subscribe(
        data => {
          Swal.fire({
            icon:'success',
            title: 'Mesa Actualizada!',
            showConfirmButton: true
          })

          this.router.navigateByUrl("pages/mesa/listar");
        }
      );
    }


  }

  validarCampos(){
    this.intentoEnvio=true;
    if(this.infoMesa.numero== "" || this.infoMesa.cantidad_inscritos== ""){
      return false;
    }else{
      return true;
    }
  }

  crearMesa(){

    let camposValidos=this.validarCampos();

    if(camposValidos){
      this.miServicioMesa.crearMesa(this.infoMesa).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Mesa Creada !',
            showConfirmButton: true
          })
  
          this.router.navigateByUrl("pages/candidato/listar")
        }
      );

    }
  }

}
