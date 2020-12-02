import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  model = {
    name: '',
    sureName: '',
    email: '',
    description: ''
  };
  submitted = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    const navigationExtras: NavigationExtras = {
      queryParams: { }
    };
    this.router.navigate(['/thank-contact-page'], navigationExtras);
  }

}
