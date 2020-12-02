import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPageRoutingModule } from './order-page-routing.module';
import { OrderPageComponent } from './component/order-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderPageComponent],
  imports: [
    CommonModule,
    OrderPageRoutingModule,
    ReactiveFormsModule,
  ]
})
export class OrderPageModule { }
