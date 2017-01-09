import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolishListComponent }   from './polish-list/polish-list.component';
import { AddPolishComponent }  from './add-polish/add-polish.component';

const routes: Routes = [
  { path: '', redirectTo: '/featured', pathMatch: 'full' },
  { path: 'featured',  component: PolishListComponent },
  { path: 'add',     component: AddPolishComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
