import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidato } from '../../../modelos/candidato.model';
import { CandidatoService } from '../../../servicios/candidato.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean = true;
  intentoEnvio: boolean=false;
  infoCandidato: Candidato = {
    cedula:"",
    numero_resolucion:"",
    nombre:"",
    apellido:"" 
  };

  constructor(private miServicioCandidato: CandidatoService,
    private router:Router,
    private rutaActiva: ActivatedRoute){}

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.idCandidato){
      this.modoCreacion = false;
      this.infoCandidato._id = this.rutaActiva.snapshot.params.idCandidato;
      this.buscarCandidato(this.infoCandidato._id);
    }else{
       this.modoCreacion= true;
    }
  }
  

  buscarCandidato(idCandidato: string){
    this.miServicioCandidato.buscarCandidatoporId(this.infoCandidato._id).subscribe(
      data =>{
        this.infoCandidato=data;
      }
    )
  }

 
  
  modificarCandidato(){

    let camposValidos= this.validarCampos();

    if(camposValidos){
      this.miServicioCandidato.modificarCandidato(this.infoCandidato,this.infoCandidato._id).subscribe(

        data=>{
          Swal.fire({
            icon:'success',
            title: 'Candidato Actualizado !',
            showConfirmButton: true
          })

          this.router.navigateByUrl("pages/candidato/listar");
        } 
      );
    }

  }

    validarCampos(){
      this.intentoEnvio=true;
      if(this.infoCandidato.cedula=="" || this.infoCandidato.numero_resolucion== "" || this.infoCandidato.nombre== "" 
        || this.infoCandidato.apellido== ""){

          return false;
        }else{
          return true;
        }
    }

    crearCandidato(){

      let camposValidos=this.validarCampos();
  
      if(camposValidos){
        this.miServicioCandidato.crearCandidato(this.infoCandidato).subscribe(
          data => {
            Swal.fire({
              icon: 'success',
              title: 'Candidato Creado !',
              showConfirmButton: true
            })
    
            this.router.navigateByUrl("pages/candidato/listar")
          }
        );
  
      }
    }


  

}
