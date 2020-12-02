import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPageComponent } from './component/order-page.component';

const routes: Routes = [{ path: '', component: OrderPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPageRoutingModule { }
