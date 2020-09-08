import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router  } from '@angular/router';
const swal = require('sweetalert');
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.validateForm();
  }

  ngOnInit(): void {
  }

  validateForm(){
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required] ],
    })
  }

  login(){
    if(this.formLogin.valid  ){
      this.userService.login(this.formLogin.value).subscribe(
        (userLogged) =>{
          this.userService.saveToken(userLogged['token']);
          
          this.router.navigate(['/']);
          swal('Bienvenido', "", 'success');
          
        },(error) => {
          swal('Los datos no coinciden', "", 'error');
          console.log('Error ', error)
        }
      )
    }else{
      swal('Diligencia todos los campos', "", 'error');
    }
  }

}
/* if (user.firstName != null && user.lastname != null && user.email != null) {
  User.findOne({ email: user.email }, (err, userEmail) => {
      if (userEmail) {
          console.log("Ya existe")
          res.status(200).send({ message: "El correo ya existe" })
      } else {
          user.save((err, userStored) => {
              if (err) {
                  res.status(500).send({ message: 'Error al guardar usuario' })
              } else {
                  if (!userStored) {
                      res.status(404).send({ message: 'No se ha registrado el usuario' })
                  } else {
                      res.status(200).send({ user: userStored })
                  }
              }
          })
      }
  })

} */
