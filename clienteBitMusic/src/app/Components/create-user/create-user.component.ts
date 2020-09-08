import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
const swal = require('sweetalert');

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router,
  ) {
    this.createValidator();
  }

  ngOnInit(): void {
  }

  /**
   * Función creada para agregar las validaciones de nuestro formulario.
   */
  createValidator(){
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  /**
   * Función que permite conectarse al servicio para registrar un usuario.
   */
  registerUser(){
    if(this.userForm.valid){
      this.userService.createUser(this.userForm.value).subscribe(
        (createdUser) => {
          swal('Registro Exítoso', "", 'success')
         /*  if(createdUser.message == "El correo ya existe"){
            swal('usuario ya existe', "", 'error');
          }else{
            swal('Registro Exítoso', "", 'success');
            this.route.navigate(['/login'])
          } */
        },(error) => {
          console.log("error al registrar el usuario", error)
        }
      )
    }else{
      swal("Diligencia todos los campos", "", 'error');
    }
  }

}
