import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { TitleCardComponent } from './components/title-card/title-card.component';
import { ContactComponent } from './components/contact/contact.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomecardComponent } from './components/homecard/homecard.component';
import { EuroPipe } from './pipes/euro.pipe';
import { MySlicePipe } from './pipes/myslice.pipe';
import { DisColorDirective } from './directives/dis-color.directive';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ThankOrderPageComponent } from './components/thank-order-page/thank-order-page.component';
import { ThankContactPageComponent } from './components/thank-contact-page/thank-contact-page.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { SiginComponent } from './components/header/sigin/sigin.component';
import { ThankRegisteredPageComponent } from './components/thank-registered-page/thank-registered-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShowcaseComponent,
    CarouselComponent,
    TitleCardComponent,
    ContactComponent,
    HomecardComponent,
    EuroPipe,
    MySlicePipe,
    DisColorDirective,
    ProductDetailsComponent,
    ContactFormComponent,
    ThankOrderPageComponent,
    ThankContactPageComponent,
    ClickOutsideDirective,
    SiginComponent,
    ThankRegisteredPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    DialogModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
