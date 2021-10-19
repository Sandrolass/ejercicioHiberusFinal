import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  urlApi = "http://51.38.51.187:5050/api/v1/auth/log-in";

  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private route: Router) {}

  private onError(err:any)
  {
    const error_no_existe = 404;
    if(err instanceof HttpErrorResponse)
    {
      if(err.status == error_no_existe)
      {
        alert("Usuario o password incorrecto");
      }
      else
      {
        alert("Error desconocido");
      }
    }
  }
  onSubmit(): void {
    this.httpClient
    .post<any>(this.urlApi, {
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    })
    .subscribe(
      token => {
        sessionStorage.setItem('token', JSON.stringify(token));
        this.route.navigate(["/usuarios"]);
      },
      error => this.onError(error));
  }
  irRegistro()
  {
    this.route.navigate(["/login/registro"]);
  }
}
