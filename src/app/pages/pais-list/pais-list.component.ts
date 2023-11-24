import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesService } from 'src/app/services/paises.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { Pais } from 'src/app/common/pais.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pais-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pais-list.component.html',
  styleUrls: ['./pais-list.component.scss']
})
export class PaisListComponent {

  private _paisService = inject(PaisesService);
  _router = inject(Router)

  paises$!: Observable<Pais[]>;
  searcher = new FormControl('');

  ngOnInit(): void {
    
    this.paises$ = this._paisService.getPlayer();

    // Ingresamos texto y se hace una nueva busqueda, con un delay de 1 segundo
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {
      if(search) {
        this.paises$ = this._paisService.getPlayer(search);
      }else {
        this.paises$ = this._paisService.getPlayer();
      }
    })
  }

  editarPais(pais: Pais) {

  }

  eliminarPais(pais: Pais) {

  }

}
