import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { PaisesService } from 'src/app/services/paises.service';
import { Router } from '@angular/router';
import { Pais } from 'src/app/common/pais.interface';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pais-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pais-edit.component.html',
  styleUrls: ['./pais-edit.component.scss']
})
export class PaisEditComponent {

  private _paisService = inject(PaisesService);
  private _location = inject(Location);
  private _router = inject(Router);

  pais!: Pais;
  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ciudades: new FormArray([])
  })

  ngOnInit(): void {
    
    this.pais = (this._location.getState() as any).pais;
    if(this.pais) this.setCurrentPais(this.pais);
    console.log(this.pais)
  }

  setCurrentPais(pais: Pais) {
    this.form.patchValue(pais as any);
    pais.ciudades.map((ciudad: any) => {
      const ciudadForm = new FormGroup({
        nombre: new FormControl(ciudad.nombre),
        lugarTuristico: new FormControl(ciudad.lugarTuristico)
      });

      (this.form.get('ciudades') as FormArray).push(ciudadForm);
    })
  }

  get ciudadesControl() {
    return (this.form.get('ciudades') as FormArray).controls
  }

  crearCiudad() {
    (this.form.get('ciudades') as FormArray).push(
      new FormGroup({
        nombre: new FormControl('', Validators.required),
        lugarTuristico: new FormControl('', Validators.required)
      })
    );
  }

  guardarPais() {
    this._paisService.updatePais({
      id: this.pais.id,
      ...this.form.getRawValue()
    } as Pais);

    this._router.navigate(['paises'])
  }
}
