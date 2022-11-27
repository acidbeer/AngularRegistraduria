import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Resultado } from '../../../modelos/resultado.model';
import { ResultadoService } from '../../../servicios/resultado.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean=true;
  intentoEnvio: boolean=false;
  infoResultado: Resultado={
    _id:"",
    numero_mesa:"",
    cedula_candidato:"",
    numero_votos:""
  };

  constructor(private miServicioResultado: ResultadoService,
    private router: Router,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.idResultado){
      this.modoCreacion=false;
      this.infoResultado._id= this.rutaActiva.snapshot.params.idResultado;
      this.buscarResultado(this.infoResultado._id);
    }else{
      this.modoCreacion=true;
    }

  }

  buscarResultado(idResultado: string){
    this.miServicioResultado.buscarResultadoPorId(this.infoResultado._id).subscribe(
      data =>{
        this.infoResultado=data;
      }
    );
  }

  modificarResultado(){
    let camposValidos= this.validarCampos();

    if(camposValidos){
      this.miServicioResultado.modificarResultado(this.infoResultado,this.infoResultado._id).subscribe(
        data => {
          Swal.fire({
            icon:'success',
            title: 'Resultado Actualizado!',
            showConfirmButton: true
          })

          this.router.navigateByUrl("pages/resultado/listar");
        }
      );
    }

  }

  validarCampos(){
    this.intentoEnvio=true;
    if(this.infoResultado._id=="" || this.infoResultado.numero_mesa=="" || this.infoResultado.cedula_candidato==""  
      || this.infoResultado.numero_votos==""){

        return false;
      }else{
        return true;
      }
  }

}
