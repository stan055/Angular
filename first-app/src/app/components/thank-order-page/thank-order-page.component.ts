import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thank-order-page',
  templateUrl: './thank-order-page.component.html',
  styleUrls: ['./thank-order-page.component.css']
})
export class ThankOrderPageComponent implements OnInit, OnDestroy {
  params: Params;
  routeParams: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.routeParams = this.route.queryParams.subscribe(params => {
      this.params = params;
  });
  }

  ngOnDestroy(): void {
    this.routeParams.unsubscribe();
  }

  submit(): void {
    this.router.navigate(['/order-page']);
  }
}
