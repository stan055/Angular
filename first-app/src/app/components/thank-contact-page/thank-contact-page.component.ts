import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thank-contact-page',
  templateUrl: './thank-contact-page.component.html',
  styleUrls: ['./thank-contact-page.component.css']
})
export class ThankContactPageComponent implements OnInit, OnDestroy {
  params: Params;
  routeParams: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routeParams = this.route.queryParams.subscribe(params => {
      this.params = params;
  });
  }

  ngOnDestroy(): void {
    this.routeParams.unsubscribe();
  }

}
