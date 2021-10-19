
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsuariosDTO } from "../DTO/usuariosDTO";
import { usuariosSimpDTO } from "../DTO/usuariosSimpDTO";
import { usuariosDAOInterface } from "../interfaces/usuariosDAOInterface";

@Injectable({
    providedIn:'root'
})

export class usuariosDAO implements usuariosDAOInterface{
    ip = 'http://51.38.51.187:5050/api/v1/users';

    constructor(private httpClient: HttpClient){}

     crearUsuario(usuario:UsuariosDTO):Observable<any>{
          return this.httpClient.post<any>(this.ip,usuario)
    }
    borrarUsuario(usuario:usuariosSimpDTO):Observable<any>{
        
     return this.httpClient.delete<any>(this.ip+"/"+usuario.id)
    }
     listarUsuarios():Observable<any>{
        
         return this.httpClient.get<any>(this.ip)
        
    }
     buscarUsuario(id:string):Observable<any>{
        
        return this.httpClient.get<any>(this.ip+"/"+id);
        
    }
     editarUsuario(usuario:UsuariosDTO):Observable<any>{
        
        return this.httpClient.put<any>(this.ip+"/"+usuario.id,usuario)
        
    }
    public onError(error:HttpErrorResponse){
        console.log(error);
    }
}