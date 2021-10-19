import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  urlAPI = "http://51.38.51.187:5050/api/v1/auth/sign-up";

  registerForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private route: Router) {}


  private onError(err:any)
  {
    const error_si_existe = 409;
    if(err instanceof HttpErrorResponse)
    {
      if(err.status == error_si_existe)
      {
        alert("El email ya esta registrado");
      }
      else
      {
        alert("Error desconocido");
      }
    }
  }

  onSubmit(): void {
    this.httpClient
    .post<any>(this.urlAPI, {
      email:this.registerForm.value.email,
      password:this.registerForm.value.password,
      name: this.registerForm.value.firstName,
      surname: this.registerForm.value.lastName,
    })
    .subscribe(token => {
      this.route.navigate(["/login"]);
    },
    error => this.onError(error)
    );
  }
  atras(){
    this.route.navigate(["/login"]);
  }
}
