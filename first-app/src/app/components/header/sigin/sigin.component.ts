import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Login } from 'src/app/interfaces/Login';
import { Register } from 'src/app/interfaces/Register';
import { SignMessage } from 'src/app/interfaces/SignMessage';
import { FireAuthService } from 'src/app/services/fire-auth.service';


@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  @Input() display: boolean;
  @Output() messageEvent = new EventEmitter<string>();
  activeTab: number;
  login: Login;
  register: Register;
  submittedTab1: boolean;
  submittedTab2: boolean;
  errorMessage: string;


  constructor(
      @Inject(DOCUMENT) private document: Document,
      private fireAuth: FireAuthService,
    ) { }


  ngOnInit(): void {
    this.initializeVariables();
  }


  activateTab(activeTab: number): void {
    this.activeTab = activeTab;
  }


  signinSubmit(validate): void {
    this.submittedTab1 = true;

    if (validate) {
      this.fireAuth.signIn(this.login.email, this.login.password)
        .then(() => {
          this.document.defaultView.location.reload();
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }

  }


  registerSubmit(validate: boolean): void {
    const confirmPassword: boolean = this.register.password === this.register.confirmPassword;
    this.submittedTab2 = true;

    if (validate && confirmPassword) {
      this.fireAuth.createUser(this.register.email, this.register.password)
        .then((user) => {
          const message: SignMessage = { type: 'register', value: user };
          // return message to header.component
          this.messageEvent.emit(JSON.stringify(message));
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }


  signInWithGoogle(): void {
    this.fireAuth.signInWithGoogle()
      .then(() => {
        this.document.defaultView.location.reload();
      })
      .catch((error) => {
        console.log('signInWithGoogle error => ', error);
      });
  }


  onHide(): void {
    // return message to header.component
    this.messageEvent.emit(JSON.stringify({ type: 'onhide', value: null }));
  }


  initializeVariables(): void {
    this.activeTab = 1;
    this.submittedTab1 = false;
    this.submittedTab2 = false;
    this.login = { email: '', password: '' };
    this.register = { email: '', password: '', confirmPassword: '' };
  }

}
