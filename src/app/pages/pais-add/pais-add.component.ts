import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesService } from 'src/app/services/paises.service';
import { Router } from '@angular/router';
import { 
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ReactiveFormsModule } from "@angular/forms";
import { Pais } from 'src/app/common/pais.interface';

@Component({
  selector: 'app-pais-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pais-add.component.html',
  styleUrls: ['./pais-add.component.scss']
})
export class PaisAddComponent {

  private _paisService = inject(PaisesService);
  _router = inject(Router);

  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ciudades: new FormArray([])
  })

  get ciudadesControl() {
    return (this.form.get('ciudades') as FormArray).controls
  }

  crearCiudad() {
    (this.form.get('ciudades') as FormArray).push(
      new FormGroup({
        nombre: new FormControl('', Validators.required),
        lugarTuristico: new FormControl('', Validators.required)
      })
    )
  }

  guardarPais() {
    this._paisService.addPlayer({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue()
    } as Pais)

    this._router.navigate(['paises'])
  }

}
