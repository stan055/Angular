import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: IProduct;
  dataSubscribe: Subscription;
  productReting = ['☆', '☆', '☆', '☆', '☆'];
  reviewCount = 0;
  contentDesctiption: string;
  isContentToggled: boolean;
  limit = 150;
  isReview: boolean;
  isModalImg: boolean;
  activeImgVal = 0;
  availabillity: boolean;
  choosedColor: string;
  choosedSize: string;
  @ViewChild('insideElement') insideElement;


  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  ngOnDestroy(): void {
    this.dataSubscribe.unsubscribe();
  }

  loadProduct(): void {
    const productId = +this.route.snapshot.paramMap.get('id');
    this.dataSubscribe = this.firebaseService.getProductById(productId, 'product')
      .subscribe(product => {
        this.product = product[0];

        if (this.product.review) {
          this.calculatingRating();
        }
      });
  }

  calculatingRating(): void {
    this.reviewCount = this.product.review.length;
    let rating = 0;
    this.product.review.forEach(el => rating += el.rating);
    rating = Math.round(rating / this.reviewCount);
    for (let i = 0; i < rating; i++) {
      this.productReting[i] = '★';
    }
    this.contentFormatting();
  }

  toggleContent(): void {
    this.isContentToggled = !this.isContentToggled;
    this.contentFormatting();
  }

  contentFormatting(): void {
    if (!this.isContentToggled) {
      this.contentDesctiption = this.product.description.substr(0, this.limit) + '...';
    } else {
      this.contentDesctiption = this.product.description;
    }
  }

  toggleReview(): void {
    this.isReview = !this.isReview;
  }

  toggleModalImg(): void {
    this.isModalImg = !this.isModalImg;
  }

  activeImg(val: string): void {
    this.activeImgVal = +val;
  }

  colorChange(event): void {
    this.choosedColor = event.target.value;
    this.isAvailabillity();
  }

  sizeChange(event): void {
    this.choosedSize = event.target.value;
    this.isAvailabillity();
  }

  isAvailabillity(): void {
    if (this.choosedColor && this.choosedSize) {
      this.availabillity = true;
    }

  }

  @HostListener('document:click', ['$event.target'])
  public closeDropList(targetElement): void {
    if (this.isModalImg && targetElement.id !== 'imgBig') {
      const clickedInside = this.insideElement.nativeElement.contains(targetElement);
      if (!clickedInside) {
        this.toggleModalImg();
      }
    }
  }
}
