

import { Component, OnInit } from '@angular/core';
import { usuariosDAO } from '../DAO/usuariosDAO';
import { UsuariosDTO } from '../DTO/usuariosDTO';
import { usuariosSimpDTO } from '../DTO/usuariosSimpDTO';

@Component({
  selector: 'app-user-pge',
  templateUrl: './user-pge.component.html',
  styleUrls: ['./user-pge.component.css']
})
export class UserPgeComponent implements OnInit {
  listaUsuarios:usuariosSimpDTO[]= [];
  usuarioEdicion:UsuariosDTO= new UsuariosDTO("","","","","");
  
  //inyectamos servicio de usuarios DAO
  constructor( private usuariosDAOservice:usuariosDAO) { }

  ngOnInit(): void {
    this.getUsers();
  }
   public getUsers(){
    
       this.usuariosDAOservice.listarUsuarios().subscribe(
         data => {this.listaUsuarios = data.items;console.log(data)},
         error => this.usuariosDAOservice.onError(error)
       )
  } 
   borrarUsuario(data:usuariosSimpDTO){
      this.usuariosDAOservice.borrarUsuario(data).subscribe(
        data => {console.log("usuario eliminado");
                this.getUsers();},
        error => this.usuariosDAOservice.onError(error)
      )
  }
  editarUsuarioI(data:usuariosSimpDTO){
      this.usuariosDAOservice.buscarUsuario(data.id).subscribe(
        dato => {console.log(data);this.usuarioEdicion = dato},
        error => this.usuariosDAOservice.onError(error)
      )
  }
  crearUsuarioF(data:UsuariosDTO){
      this.usuariosDAOservice.crearUsuario(data).subscribe(
        data => {console.log("usuario creado");
                this.getUsers();},
        error => this.usuariosDAOservice.onError(error)
      )
  }
  editarUsuarioF(data:UsuariosDTO){
      this.usuariosDAOservice.editarUsuario(data).subscribe(
        data => {console.log("usuario actualizado");
                this.getUsers();},
        error => this.usuariosDAOservice.onError(error)
      )
  }
  resetear(){
    this.usuarioEdicion= new UsuariosDTO("","","","","");
  }
  /* crearUsuarioFinal(){
    var usuario = new UsuariosDTO("email","password","John","Rambo","00000000");
    this.usuariosDAOservice.crearUsuario(usuario);
  } */
}
