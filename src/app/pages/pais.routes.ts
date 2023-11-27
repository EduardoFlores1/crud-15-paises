import { Routes } from "@angular/router";
import { PaisListComponent } from "./pais-list/pais-list.component";
import { PaisAddComponent } from "./pais-add/pais-add.component";
import { PaisEditComponent } from "./pais-edit/pais-edit.component";

export const paisRoutes: Routes = [
    {path: '', title: 'Pais List', component: PaisListComponent},
    {path: 'add', title: 'Pais Add', component: PaisAddComponent},
    {path: 'edit', title: 'Pais Edit', component: PaisEditComponent}
]