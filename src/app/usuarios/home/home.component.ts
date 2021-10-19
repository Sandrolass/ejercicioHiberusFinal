import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartType } from 'angular-google-charts';
import { usuariosDAO } from '../DAO/usuariosDAO';
import { UsuariosDTO } from '../DTO/usuariosDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  listado:UsuariosDTO[]=[];
  items = new Map();
  keys :string[]=[];
  listaFinal:any[]=[];
  cards:any;
  ngOnInit(){
    this.getDatos();
  }
  getDatos(){
    this.usuarioDAO.listarUsuarios().subscribe(
      data=>{
        this.listado = data.items;
        this.crearDiccionario();
        this.cogerDatosDicc();
        this.cards= this.breakpointObserver.observe(Breakpoints.Handset).pipe(
          map(({ matches }) => {
            if (matches) {
              return [
                {
                  title: 'Usuarios con mismos nombres',
                  cols: 1,
                  rows: 1,
                  type: ChartType.ColumnChart,
                  data: this.listaFinal,
                  columnNames: ['Nombre', 'Cantidad de reps'],
                  width: 600,
                  height: 450,
                  options: {},
                },
                 {
                  title: 'Porcentaje de cada nombre',
                  cols: 1,
                  rows: 1,
                  type: ChartType.PieChart,
                  data: this.listaFinal,
                  columnNames: ['Nombre', 'valor'],
                  width: 600,
                  height: 450 ,
                  options: {},
                } 
                
              ];
            }
      
            return [
              {
                title: 'Usuarios con mismos nombres',
                cols: 1,
                rows: 1,
      
                type: ChartType.ColumnChart,
                data:this.listaFinal,
                columnNames: ['Nombre', 'Cantidad de reps'],
                width: 600,
                height: 450,
                options: {},
              },
              {
                title: 'Porcentaje de cada nombre',
                cols: 1,
                rows: 1,
                type: ChartType.PieChart,
                data: this.listaFinal,
                columnNames: ['Nombre', 'valor'],
                width: 600,
                height: 450 ,
                options: {},
              } 
              
            ];
          })
        );
        
      }
    )
  }
   

  constructor(private breakpointObserver: BreakpointObserver,private usuarioDAO : usuariosDAO
    ,private route:Router) {}
  public crearDiccionario(){
    for(let i=0; i<this.listado.length;i++){
      if(this.items.has(this.listado[i].name)){
        let cantidad = 0;
        cantidad = this.items.get(this.listado[i].name);
        this.items.set(this.listado[i].name,cantidad+1);
      }else{
        this.items.set(this.listado[i].name,1);
        this.keys.push(this.listado[i].name);
      }
    }
    /* console.log(this.items);
    console.log(this.keys); */
  }
  public cogerDatosDicc(){
    for(let i=0;i<this.keys.length;i++){
      this.listaFinal.push([this.keys[i],this.items.get(this.keys[i])]);
    }
    console.log(this.listaFinal); 
   }
   irLista(){
    this.route.navigate(["/usuarios/gestion"])
   }
  public signOut(){
    sessionStorage.removeItem("token");
    this.route.navigate(["/login"])
  }

}
