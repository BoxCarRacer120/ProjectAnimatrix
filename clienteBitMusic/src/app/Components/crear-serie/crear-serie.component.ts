import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service';
const swal = require('sweetalert');

@Component({
  selector: 'app-crear-serie',
  templateUrl: './crear-serie.component.html',
  styleUrls: ['./crear-serie.component.css']
})
export class CrearSerieComponent implements OnInit {
  serieForm: FormGroup;
  public file: File;

  constructor(
    private formBuilder: FormBuilder,
    private serieService: SeriesService,
    private routeParams: ActivatedRoute, //Lo vamos a utilizar para obtener los parametros de la url.
    private route: Router //Para generar redirecciones
  ) {

  }

  ngOnInit(): void {
    this.validateForm()
  }
  validateForm() {
    this.serieForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      sinopsis: ['', Validators.required],
      precluela: ['', Validators.required],
      secuela: ['', Validators.required],
      numeroCapitulos: ['', Validators.required],
      file: [null, Validators.required],
    })

  }
  registerSerie() {
    if (this.serieForm.valid) {

      const serie = this.serieForm.value;
      const formatoSerie = serie.file.split('\\')[2].split('\.')[1].toLowerCase()


      const formData = new FormData();
      formData.append('name', serie.name);
      formData.append('author', serie.author);
      formData.append('genre', serie.genre);
      formData.append('sinopsis', serie.sinopsis);
      formData.append('precluela', serie.precluela);
      formData.append('secuela', serie.secuela);
      formData.append('numeroCapitulos', serie.numeroCapitulos);


      formData.append('image', this.file);
      if (formatoSerie == "jpg" || formatoSerie == "png") {
        this.serieService.createSerie(formData).subscribe(
          (createdSerie) => {
            swal('Serie creada', "", 'success'); //Mostrar mensajes con sweetalert
            // this.route.navigate(['/misCanciones']);//Redireccionar a otro componente.
          },
          (error) => {
            swal('Error al crear la seri', "", 'error');
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
