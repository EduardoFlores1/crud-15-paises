import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    {path: '', redirectTo: 'paises', pathMatch: 'full'},
    {path: 'paises', loadChildren: () => import('./pages/pais.routes').then((r) => r.paisRoutes)}
]