import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProductComponent } from './component/edit-product.component';

const routes: Routes = [{ path: '', component: EditProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProductRoutingModule { }
