import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosDTO } from '../../DTO/usuariosDTO';
import { Mongoose } from 'mongoose';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  mongoose = require('mongoose');
  @Input() usuarioEdicion= new UsuariosDTO("","","","",""); 
  @Output() usuarioCreacion = new EventEmitter<UsuariosDTO>();
  @Output() usuarioEdicionF = new EventEmitter<UsuariosDTO>();
  @Output() cancelarTodo = new EventEmitter();
  
  idCopia:string='';
  flagEdicion:boolean = false;
  formGroup = this.fb.group({
    name:['',Validators.required],
    surname:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]
  });

  

  constructor(private fb: FormBuilder) {
    
  }

  onSubmit(): void {
    alert('Thanks!');
  }
  ngOnChanges(cambio:SimpleChange){
    if(this.comproabarUsuario()){
      this.flagEdicion = true;
      this.formGroup = this.fb.group({
        name:[this.usuarioEdicion.name,Validators.required],
        surname:[this.usuarioEdicion.surname,Validators.required],
        email:[this.usuarioEdicion.email,Validators.required],
        password:[this.usuarioEdicion.password]
      });
      this.idCopia=this.usuarioEdicion.id;
    }
  }
  editar(){
    let d = this.formGroup.value;
    let usuarioNuevo = new UsuariosDTO(d.email,d.password,d.name,d.surname,this.idCopia);
    this.poneraCero();
    this.usuarioEdicionF.emit(usuarioNuevo);

  }
  crear(){
    this.flagEdicion = false;
    let id = this.mongoose.Types.ObjectId();
    let d = this.formGroup.value;
    this.poneraCero();
    let usuarioNuevo = new UsuariosDTO(d.email,d.password,d.name,d.surname,id.toString());
    this.usuarioCreacion.emit(usuarioNuevo);
  }
  cancelar(){
    this.flagEdicion = false;
    this.poneraCero();
    
  }
  poneraCero(){
    this.formGroup=this.fb.group({
      name:['',Validators.required],
      surname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    });
    this.idCopia ='';
    this.cancelarTodo.emit();
  }
  comproabarUsuario():boolean{
    let flag = false;
    let valores = Object.values(this.usuarioEdicion);
    
     for(let i=0;i<valores.length;i++ ){
      if(valores[i]!=""){
        flag=true
        return flag;
      }
      
    }
    return flag;
  }
}
