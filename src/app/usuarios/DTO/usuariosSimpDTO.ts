import { usuariosSimpInterface } from "../interfaces/usuariosSimInterface";

export class usuariosSimpDTO implements usuariosSimpInterface{
    email:string;
    name:string;
    surname:string;
    id:string;
    constructor(email:string,name:string, surname: string, id:string){
        this.email= email;
        this.name= name;
        this.surname = surname;
        this.id = id;

    }
    getName(){
        return this.name;
    }
    setName(data:string){
        this.name=data;
    }
    getSurname(){
        return this.surname;
    }
    setSurname(data:string){
        this.surname=data;
    }
    getEmail(){
        return this.email;
    }
    setEmail(data:string){
        this.email=data;
    }
    getId(){
        return this.id;
    }
    setId(data:string){
        this.id=data;
    }
    
}