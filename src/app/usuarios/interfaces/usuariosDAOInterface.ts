import { Observable } from "rxjs";
import { UsuariosDTO } from "../DTO/usuariosDTO";
import { usuariosSimpDTO } from "../DTO/usuariosSimpDTO";

export interface usuariosDAOInterface{
    ip:string;
    crearUsuario(usuario:UsuariosDTO):Observable<any>,
    borrarUsuario(usuario:usuariosSimpDTO):Observable<any>,
    listarUsuarios():Observable<any>,
    buscarUsuario(id:string):Observable<any>,
    editarUsuario(usuario:UsuariosDTO):Observable<any>
}