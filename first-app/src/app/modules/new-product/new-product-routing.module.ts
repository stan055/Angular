import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProductComponent } from './component/new-product.component';

const routes: Routes = [{ path: '', component: NewProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProductRoutingModule { }
