import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { emptyIProduct, ImgUrl, IProduct } from 'src/app/interfaces/IProduct';
import { Color } from 'src/app/services/color';
import { getRandomInt } from 'src/app/services/random-int';
import { Size } from 'src/app/services/size';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  fileUploadTouched: boolean;
  checkFiles: boolean;
  selectedCities: string[] = [];
  multiselectColors = Color;
  multiselectSizes = Size;
  shouldBeUpload: File[] = [];
  shouldBeDeleted: ImgUrl[] = [];
  initObject: any;
  pageMode = 'new';
  pageTitle = 'New Product Page';
  formTitle = 'Add product form';
  routeProductSubscrip: Subscription;


  constructor(private fb: FormBuilder, private firebaseService: FirebaseService,
              private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.initiaizeInitObject();
    this.initializeForm();
  }


  ngOnDestroy(): void {
    this.routeProductSubscrip.unsubscribe();
  }


  initiaizeInitObject(): void {
    this.initObject = emptyIProduct();
    this.initObject.id = getRandomInt(999999);

    this.routeProductSubscrip = this.route.queryParams
      .subscribe((params) => {
        if (params.product) {
          this.pageMode = 'edit';
          this.pageTitle = 'Edit Product Page';
          this.formTitle = 'Edit product form';

          const prod: IProduct = JSON.parse(params.product);

          for (const p of prod.size) {
            this.initObject.size.push({ name: p });
          }
          for (const c of prod.color) {
            this.initObject.color.push({ name: c });
          }

          this.initObject.name = prod.name;
          this.initObject.description = prod.description;
          this.initObject.discount = prod.discount;
          this.initObject.id = prod.id;
          this.initObject.imgUrl = prod.imgUrl;
          this.initObject.main = prod.main;
          this.initObject.new = prod.new;
          this.initObject.price = prod.price;
          this.initObject.review = prod.review;
          this.initObject.shipping = prod.shipping;
          this.initObject.shop = prod.shop;

          const d = Date.parse(prod.discountUntil);
          const dd = new Date(d);

          this.initObject.discountUntil = {
            date: dd.getFullYear() + '-' + dd.getMonth() + '-' + dd.getDate(),
            time: dd.getHours() + ':' + dd.getMinutes()
          };

        }
      });
  }


  initializeForm(): void {
    this.productForm = this.fb.group({
      id: [this.initObject.id, ],
      imgUrl: [[], ],
      price: [this.initObject.price, Validators.required],
      discount: [this.initObject.discount, Validators.required],
      main: this.initObject.main.toString(),
      shop: [this.initObject.shop, Validators.required],
      name: [this.initObject.name, Validators.required],
      description: [this.initObject.description, Validators.required],
      shipping: [this.initObject.shipping, Validators.required],
      discountUntil: this.fb.group({
        date: this.initObject.discountUntil.date,
        time: this.initObject.discountUntil.time
      }),
      new: this.initObject.new.toString(),
      color: [this.initObject.color, Validators.required],
      size: [this.initObject.size, Validators.required],
      review: [[]]
    });
  }



  get Color(): FormArray {
    return this.productForm.get('color') as FormArray;
  }

  get Size(): FormArray {
    return this.productForm.get('size') as FormArray;
  }

  get imgUrl(): FormArray {
    return this.productForm.get('imgUrl') as FormArray;
  }

  get Controls(): any {
    return this.productForm.controls;
  }

  deleteInitImg(index: number): void {
    this.shouldBeDeleted.push(this.initObject.imgUrl[index]);
    this.initObject.imgUrl.splice(index, 1);
    this.fileUploadTouched = true;
  }

  onSelect(event): void {
    this.shouldBeUpload = event.currentFiles;
    this.fileUploadTouched = true;
  }

  removeColor(index: number): void {
    this.Color.removeAt(index);
  }

  addColor(): void {
    this.Color.push(this.fb.control(''));
  }

  removeSize(index: number): void {
    this.Size.removeAt(index);
  }

  addSize(): void {
    this.Size.push(this.fb.control(''));
  }


  onSubmit(): void {

    if (this.pageMode === 'new') {

      const resultObj = this.createResulObj();

      this.firebaseService.createProduct(resultObj,  this.shouldBeUpload)
        .finally(() => this.router.navigate(['/']));

    } else if (this.pageMode === 'edit') {

      const resultObj = this.createResulObj();
      resultObj.imgUrl = this.initObject.imgUrl;

      this.firebaseService.editProductById(resultObj, this.shouldBeUpload, this.shouldBeDeleted)
        .finally(() => this.router.navigate(['/edit-product']));

    }

  }

  createResulObj(): IProduct {
    const resultObj: IProduct = this.productForm.value;
    resultObj.color = [];
    resultObj.size = [];
    resultObj.main = (this.productForm.value.main === 'true');
    resultObj.new = (this.productForm.value.new === 'true');

    if (this.Color.value.length) {
      this.Color.value.forEach(el => resultObj.color.push(el.name));
    }

    if (this.Size.value.length) {
      this.Size.value.forEach(el => resultObj.size.push(el.name));
    }

    // tslint:disable-next-line:no-string-literal
    if (resultObj.discountUntil['date'] !== '') {
    // tslint:disable-next-line:no-string-literal
    resultObj.discountUntil = resultObj.discountUntil['date'] + 'T' + resultObj.discountUntil['time'];
    } else {
      resultObj.discountUntil = '';
    }

    return resultObj;
  }

}
