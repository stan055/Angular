import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductRoutingModule } from './new-product-routing.module';
import { NewProductComponent } from './component/new-product.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewProductComponent],
  imports: [
    CommonModule,
    NewProductRoutingModule,
    FileUploadModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FormsModule,
  ]
})
export class NewProductModule {


 }
