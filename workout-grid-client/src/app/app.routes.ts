import { Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { ConfigComponent } from './config/config.component';

export const routes: Routes = [
  { path: '', component: GridComponent },
  { path: 'config', component: ConfigComponent },
];
