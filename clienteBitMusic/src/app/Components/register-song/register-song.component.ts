import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CapService } from '../../services/cap.service';
const swal = require('sweetalert');
/**npm install sweetalert --save
 *  npm i @types/node
 * Agregar node al archivo tsconfig.app.json en la sección de types
 */

@Component({
  selector: 'app-register-song',
  templateUrl: './register-song.component.html',
  styleUrls: ['./register-song.component.css']
})
export class RegisterSongComponent implements OnInit {

  capForm: FormGroup;
  public file: File;
  constructor(
    private formBuilder: FormBuilder,
    private capService: CapService,
    private routeParams: ActivatedRoute, //Lo vamos a utilizar para obtener los parametros de la url.
    private route: Router //Para generar redirecciones
  ) {
    this.validateForm();
  }

  /** Nos permite cargar tareas pesadas. */
  ngOnInit(): void {
  }

  validateForm() {
    this.capForm = this.formBuilder.group({
      seriesId: ['', Validators.required],
      capName: ['', Validators.required],
      //capNumber: ['', Validators.required],
      duration: ['', Validators.required],
      file: [null, Validators.required],
    })
  }

  registerCap() {
    if (this.capForm.valid) {

      const cap = this.capForm.value;
      const formatoCap = cap.file.split('\\')[2].split('\.')[1].toLowerCase()
      console.log("formato------>", formatoCap);

      const formData = new FormData();
      formData.append('capName', cap.capName);
      formData.append('duration', cap.duration);
      formData.append('file', this.file);
      formData.append('seriesId', cap.seriesId);
      if (formatoCap == "mp4" || formatoCap == "avi") {
        this.capService.createCap(formData).subscribe(
          (createdSong) => {
            swal('Canción creada', "", 'success'); //Mostrar mensajes con sweetalert
            this.route.navigate(['/misCanciones']);//Redireccionar a otro componente.
          },
          (error) => {
            console.log("aqui llego")
           console.error("Error al crear la canción", error) 
          }
        );
      } else {
        swal('Error', "Formato incorrecto", 'error');
      }
    } else {
      //alert("Error, debes llenar todos los campos")
      swal('Error', "Error, debes llenar todos los campos", 'error');
    }

  }

  prepareCap(event: any) {
    this.file = <File>event.target.files[0];
  }


}
