import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Pais } from '../common/pais.interface';
import { 
  addDoc, 
  collection, 
  query, 
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc } from '@firebase/firestore';
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

  async updatePais(pais: Pais) {
    const paisRef = collection(this._firestore, 'paises');
    let q = query(paisRef, where('id', '==', pais.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this._firestore, 'paises', document.id)

      await updateDoc(docRef, {...pais})
    })
  }

  async deletePais(id: string) {
    const paisRef = collection(this._firestore, 'paises');
    let q = query(paisRef, where('id', '==', id))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this._firestore, 'paises', document.id);

      await deleteDoc(docRef);
    })
  }

}
