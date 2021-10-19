import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChange, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { usuariosSimpDTO } from '../../DTO/usuariosSimpDTO';

import { UserListDataSource} from './user-list-datasource';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<usuariosSimpDTO>;
  @Input() listaUsuarios: usuariosSimpDTO[]; 
  dataSource: UserListDataSource;
  @Output() usuarioEditar = new EventEmitter <usuariosSimpDTO>();
  @Output() usuarioBorrar = new EventEmitter <usuariosSimpDTO>();
  @Output() crearUsuario = new EventEmitter();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'surname','email','opciones'];

  constructor(private route: Router) {
    this.listaUsuarios = [];
    this.dataSource = new UserListDataSource(this.listaUsuarios);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if(typeof(this.table)!="undefined"){
      this.table.dataSource = this.dataSource;
    }
    this.table.dataSource = this.dataSource;
  }
  ngOnChanges(cambios:SimpleChange){
    if(this.listaUsuarios.length != 0){
      this.dataSource = new UserListDataSource(this.listaUsuarios);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    }
    
  }
  public updateUser(data:usuariosSimpDTO){
    
    this.usuarioEditar.emit(data);
  }
  public deleteUser(data:usuariosSimpDTO){
    this.usuarioBorrar.emit(data);
  }
  public irEstadisticas(){
    this.route.navigate(["/usuarios"]);
  }
  
}
