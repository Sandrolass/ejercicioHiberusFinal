import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable,throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class AuthInterceptorService implements HttpInterceptor{
  constructor(private route: Router)
  {

  }
  //metodo que se ejecuta cada vez que se intercepta una peticion
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = sessionStorage.getItem("token");
    
    if(token != null)
    {
      //esto significa que tenemos un token
      // acordarse que guardamos toda la respuesta del login
      /*
      Tendremos un objeto con esta estructura
      {
        "accessToken": "string",
        "refreshToken": "string",
        "tokenType": "string"
      }
      */
      var valor_token = JSON.parse(token);
      var request = req.clone({
        setHeaders:{
          //aqui usando templates de ES6
          //authorization: `${valor_token.tokenType} ${valor_token.accessToken}`
          //concatenando como toda la vida
          authorization: valor_token.tokenType + " " + valor_token.accessToken
        }
      });
      return next.handle(request);
    }
    else
    {
      //aqui no tendriamos token sesion
      //entonces le decimos que siga sin el token, esto dara un error que deberemos capturar
      return next.handle(req).pipe(
        catchError(this.handleError.bind(this))
      );
    }
  }
  private handleError(error:any){
    const codigo = 401;
    console.log("empezando");
    //primero nos asseguramos que es un error http , porque podria entrar en este 
    //manejador con otro tipo de errores, en este caso solo me estoy centrando 
    //en los errores que se pueden dar en las peticiones
    if(error instanceof HttpErrorResponse){
      //ahora compruebo el codigo de error , en este caso comparamos contra el 401
      if(error.status==codigo){
        //si este error sucede queremos llevar al ususario a la pagina de registro
        //para la navegacion, el objeto route tiene un metodo navigate que nos permite
        //forzar la navegacion a una url de nuestra aplicacion
        this.route.navigate(["/login"]);
      }
      if(error.status ===500){
        console.log("500");
        console.log(error);
      }
    }
    //siempre debemos devolver algo en este caso hacemos un throw de error
    //eso se hace como para las peticiones podemos llegar a tener varios manejadores
    //de errores y hacemos el throw para que continue el flujo
    return throwError(error);
}

}
