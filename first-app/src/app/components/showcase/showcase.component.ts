import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  cardsOther: IProduct[] = [];
  titleCard: IProduct;
  cardsSubscripe: Subscription;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getDataFirebase();
  }

  ngOnDestroy(): void {
    this.cardsSubscripe.unsubscribe();
  }

  getDataFirebase(): void {
    this.cardsSubscripe = this.firebaseService.getProductsCollection('product').subscribe(data => {
      this.titleCard = data.find(el => el.main === true);
      this.cardsOther = data.filter(el => el.main === false).sort((a, b) => b.discount - a.discount);
    });

  }

}
