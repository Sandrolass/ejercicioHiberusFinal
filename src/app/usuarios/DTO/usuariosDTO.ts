import {UsuariosInterface} from "../interfaces/usuariosInterface"
export class UsuariosDTO implements UsuariosInterface{
    email:string;
    password:string;
    name:string;
    surname:string;
    id:string;
    constructor(email:string , pass:string,name:string,surn:string,id:string){
        this.email=email;
        this.password=pass;
        this.name=name;
        this.surname=surn;
        this.id=id;
    }
    getName(){
        return this.name;
    }
    getPassword(){
        return this.password;
    }
    getId(){
        return this.id;
    }
    getSurname(){
        return this.surname;
    }
    getEmail(){
        return this.email;
    }
    setName(data:string){
        this.name=data;
    }
    setSurname(data:string){
        this.surname=data;
    }
    setEmail(data:string){
        this.email=data;
    }
    setId(data:string){
        this.id=data;
    }
    setPassword(data:string){
        this.password=data;
    }
}