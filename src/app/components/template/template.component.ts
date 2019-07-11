import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form){
  border: 1px solid red;
  }
  `]
})
export class TemplateComponent implements OnInit {

  usuario={nombre:null,
           apellido:null,
           correo:null,
           pais:"",
           sexo:"Hombre",
          acepta:false}

           sexos = [
                    {genero:"Hombre"},
                    {genero:"Mujer"}
                   ];

     paises = [{codigo:"PA",nombre:"Panama"},
               {codigo:"CRC",nombre:"Costa Rica"},
               {codigo:"CO",nombre:"colombia"}
              ];

  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm){
    console.log("formulario Posteado");
    console.log("ngForm: ",forma);
    console.log("Valor: ",forma.value);
    console.log("Usuario: ",this.usuario);
  }

}
