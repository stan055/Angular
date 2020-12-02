import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Subscription } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  productsSubscribe: Subscription;

  constructor(private firebaseService: FirebaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.getDataFirebase();
  }

  ngOnDestroy(): void {
    this.productsSubscribe.unsubscribe();
  }

  getDataFirebase(): void {
    this.productsSubscribe = this.firebaseService.getProductsCollection('product')
      .subscribe(data => {
        this.products = data;
      });
  }

  edit(index: number): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { product: JSON.stringify(this.products[index]) }
    };
    this.router.navigate(['/new-product-page'], navigationExtras);
  }

  delete(id: number): void {
    this.firebaseService.deleteProductById(id, 'product');
  }

}
