import { Component, OnInit, Inject } from '@angular/core';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { DOCUMENT } from '@angular/common';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { SignMessage } from 'src/app/interfaces/SignMessage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  orderPageRoles = [Role.admin, Role.customer, Role.owner];
  editProductRoles = [Role.admin, Role.owner];
  createProductRoles = [Role.admin];
  displaySignInModal: boolean;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fireAuth: FireAuthService,
    private route: Router
  ){}


  ngOnInit(): void {
    this.user = this.fireAuth.currentUser;
    this.displaySignInModal = false;
  }


  showDialog(): void {
    this.displaySignInModal = true;
  }


  permission(roleArr: Role[]): boolean {
    // return roleArr.indexOf(this.user.role) === -1 ? false : true;
    return true;
  }


  // message from sigin.component
  outputSigin(message): void {
    this.displaySignInModal = false;
    const parsMess: SignMessage = JSON.parse(message);

    if (parsMess.type === 'register') {
      this.user = parsMess.value;
      this.route.navigate(['app-thank-registered-page']);
    }

  }


  logout(): void {
    this.fireAuth.logout().then(() => {
        this.document.defaultView.location.reload();
      });
  }


  get unautorized(): boolean {
    return this.user.role === Role.unauthorized ? true : false;
  }

}
