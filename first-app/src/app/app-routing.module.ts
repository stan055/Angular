import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ThankOrderPageComponent } from './components/thank-order-page/thank-order-page.component';
import { ThankContactPageComponent } from './components/thank-contact-page/thank-contact-page.component';

import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { ThankRegisteredPageComponent } from './components/thank-registered-page/thank-registered-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShowcaseComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'order-page',
    loadChildren: () => import('./modules/orger-page/order-page.module')
      .then(m => m.OrderPageModule),
    // canActivate: [AuthGuard],
    // data: { roles: [Role.admin, Role.customer, Role.owner]}
  },
  {
    path: 'thank-order-page',
    component: ThankOrderPageComponent
  },
  {
    path: 'thank-contact-page',
    component: ThankContactPageComponent
  },
  {
    path: 'app-thank-registered-page',
    component: ThankRegisteredPageComponent,
    // canActivate: [AuthGuard],
    // data: { roles: [Role.customer]}
  },
  {
    path: 'new-product-page',
    loadChildren: () => import('./modules/new-product/new-product.module')
      .then(m => m.NewProductModule),
    // canActivate: [AuthGuard],
    // data: { roles: [Role.admin]}
  },
  {
    path: 'edit-product',
    loadChildren: () => import('./modules/edit-product/edit-product.module')
      .then(m => m.EditProductModule),
    // canActivate: [AuthGuard],
    // data: { roles: [Role.admin, Role.owner]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
