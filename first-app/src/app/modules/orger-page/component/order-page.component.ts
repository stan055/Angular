import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';
import { NavigationExtras, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

interface Goods {
  value: IProduct;
  description: {
    color: string,
    size: string,
    count: string,
    checked: boolean
  };
}

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  pdoductSubscribe: Subscription;
  goodses: Goods[] = [];
  chooseGoods: Goods[] = [];
  dropDown: boolean;
  step: number;
  dateToday: number;

  @ViewChild('radioButtonToday', {static: false}) radioButtonToday: ElementRef;
  @ViewChild('radioButtonTomorrow', {static: false}) radioButtonTomorrow: ElementRef;
  @ViewChild('yourDate', {static: false}) yourDate: ElementRef;
  @ViewChild('insideElement') insideElement;


  constructor(private fb: FormBuilder, private router: Router, private database: FirebaseService) { }

  ngOnInit(): void {
    this.initialize();
    this.getData();
  }

  initialize(): void {
    this.step = 0;
    this.dateToday = Date.now();
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.pdoductSubscribe.unsubscribe();
  }

  getData(): void {
    this.pdoductSubscribe = this.database.getProductsCollection('product').subscribe(val => {
      this.goodses = [];
      val.forEach(v => {
        this.goodses.push(this.createGoods(v));
      });
    });
  }

  createGoods(Product: IProduct, Color = 'black', Size = 'M', Count = '1', Checked = false): Goods {
    return {
      value: Product,
      description: {
        color: Color,
        size: Size,
        count: Count,
        checked: Checked
      }
    };
  }

  initializeForm(): void {
    this.orderForm = this.fb.group({
      goods: this.fb.group({
        goodses: [[], ],
      }),
      address: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required]
      }),
      payment: this.fb.group({
        payment: ['', Validators.required]
      }),
      date: this.fb.group({
        delivery: ['', Validators.required]
      })
    });
  }

  dropDownToggle(): void {
    this.dropDown = !this.dropDown;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  yourDateChange(): void {
    this.radioButtonToday.nativeElement.checked = false;
    this.radioButtonTomorrow.nativeElement.checked = false;
  }

  radioDateChange(): void {
    this.yourDate.nativeElement.value = '';
  }

  submit(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { }
    };
    this.router.navigate(['/thank-order-page'], navigationExtras);
  }

  goodsToggle(id: string): void {

    const findedIndex = this.orderForm.controls.goods.value.goodses.findIndex(el => el.value.id === +id);
    const res = this.goodses.find(el => el.value.id === +id);

    if (findedIndex === -1) {
      if (res !== undefined) {
        this.orderForm.controls.goods.value.goodses.push(res);
      }
    } else {
      this.orderForm.controls.goods.value.goodses.splice(findedIndex, 1);
    }
    res.description.checked = !res.description.checked;
  }

  @HostListener('document:click', ['$event.target'])
  public closeDropList(targetElement): void {
    if (this.dropDown && this.step === 0) {
      const clickedInside = this.insideElement.nativeElement.contains(targetElement);
      if (!clickedInside) {
        this.dropDown = !this.dropDown;
      }
    }
  }
}
