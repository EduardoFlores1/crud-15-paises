import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Pais } from '../common/pais.interface';
import { addDoc, collection, query, where } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _firestore = inject(Firestore)

  constructor() { }

  addPlayer(pais: Pais) {
    const paisRef = collection(this._firestore, 'paises');
    return addDoc(paisRef, pais);
  }

  getPlayer(filter: string = '') {
    const paisRef = collection(this._firestore, 'paises');
    let q = query(paisRef);
    if(filter) {
      q = query(paisRef, where('nombre', '==', filter));
    }

    return collectionData(q) as Observable<Pais[]>;
  }


}
