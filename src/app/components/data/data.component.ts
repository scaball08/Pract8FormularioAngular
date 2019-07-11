import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, FormGroupName, Validators, FormArray, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent  {
  forma:any;
  usuario = {
             nombreCompleto:
                           {
                             nombre:"Sergio",
                             apellido:"Caballero"
                            },
             correo:"sergio.caball@pakimail.com",
             pasatiempos:['correr']
            };

  constructor(private _fb:FormBuilder) {
    console.log(this.usuario);
    // this.forma = new FormGroup({
    //  'nombreCompleto': new FormGroup({
    //    'nombre': new FormControl('',[
    //                                   Validators.required,
    //                                   Validators.minLength(5)
    //                                 ]),
    //     'apellido':new FormControl('',Validators.required)
    //   }),
    //  'correo':new FormControl('',
    //           [Validators.required,
    //            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
    //           ]),
    //   'pasatiempos' : new FormArray([
    //     new FormControl('correr',Validators.required)
    //   ])

    // });

    /// **** USANDO EL FORMBUILDER ***
    this.forma = this._fb.group({
      'nombreCompleto': this._fb.group({
        'nombre': ['',[
                        Validators.required,
                        Validators.minLength(5)
                      ]],
         'apellido':['',[Validators.required,this.noCaballero]]
       }),
      'correo':['',
               [Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
               ]],
       'pasatiempos' : this._fb.array([
         this._fb.control('',Validators.required)
        ]),
        'username':['',Validators.required,this.existeUsuario],
        'password1':['',Validators.required],
        'password2':[]

    });

     this.forma.controls['password2'].setValidators([Validators.required,this.noigual.bind(this.forma)]);
    console.log(this.forma);

    //verificar cuando cambia el valor de un control
    this.forma.controls['username'].valueChanges
    .subscribe((data)=>{
      console.log(data);
    });
    //verificar cuando cambia el estatus de un control
    this.forma.controls['username'].statusChanges
    .subscribe((data)=>{
      console.log(data);
    });
    //instruccion para asignarle valor por defecto o datos a nuestra instacia de formGroup
    // con un objeto que tenga la misma estructura con el setValue(objeto)
    // this.forma.setValue(this.usuario);

  }

  agregarPasatiempo(){
    const jovies = this.forma.get('pasatiempos') as FormArray;
     (jovies as FormArray).push(this._fb.control('',Validators.required));
  }


    // VALIDACION PERSONALIZADA PARA LOS CONTROLES
    //                 ESTRUCTURA:
// forma de declarar la estructura de un objeto typescript
//{[<nombre_de_propiedad>:string]:<tipo_de_valor>}
// que es el que se vera en os estados del control de la FORMA
  noCaballero(control:FormControl):{[s:string]:boolean}{

    if (control.value.toLowerCase() ==="caballero") {

      return {noCaballero:true};
    }

    return null;
  }

  // para llamar a este metodo debe asignarle la funcion bind(objeto forma)
  // el objeto forma no pertenese al contexto o scope del metodo

  noigual(control:FormControl):{[s:string]:boolean}{
    // console.log(this);

    let forma:any = this;

    if (control.value !== forma.controls['password1'].value) {

      return {noiguales:true};
    }

    return null;
  }
  existeUsuario(control:FormControl):Promise<any> | Observable<any>{

    let promesa =  new Promise((resolve,reject)=>{

       setTimeout(()=>{
         if (control.value==="scaball") {

          resolve({existe:true});

         } else {
          resolve(null);
         }
       },3000);

    });
    return promesa;

  }


  guardarCambios(){
    console.log(this.forma.value);
    console.log(this.forma);


    // resetear el FormGroup y poner en estado 'pristine untouched'
    // con un objeto de la misma estructura
    // con esto se puede a volver a realizar las validacion existentes
    // this.forma.reset({nombreCompleto:
    //                   {
    //                     nombre:"",
    //                     apellido:""
    //                   },
    //                   correo:"",
    //                 pasatiempos:[]
    //                 });


  }



}
