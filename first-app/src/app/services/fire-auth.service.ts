import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import * as firebase from 'firebase/app';


const AdminAndOwnerEmails = [
  { email: 'admin@gmail.com', role: Role.admin },
  { email: 'owner@gmail.com', role: Role.owner },
];


@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  user: User;


  constructor(
    private auth: AngularFireAuth,
  ) {
    this.user = JSON.parse(localStorage.getItem('user')) || new User('unautorized');
  }


  createUser(email: string, password: string): Promise<User> {
    return this.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
              this.user = new User(email, '', Role.customer, user.user.uid);
              localStorage.setItem('user', JSON.stringify(this.user));
              return this.user;
            });
  }


  signIn(email: string, password: string): Promise<void> {
    return this.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
              const role = this.whatRole(email);
              this.user = new User(email, '', role, user.user.uid);
              localStorage.setItem('user', JSON.stringify(this.user));
            });
  }


  logout(): Promise<void> {
    return this.auth.signOut()
            .then(() => {
              localStorage.removeItem('user');
              this.user = new User('unautorized');
              localStorage.setItem('user', JSON.stringify(this.user));
            })
            .catch((error) => {
              console.log('logout Error => ', error);
            });
  }


  signInWithGoogle(): Promise<void> {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    return firebase.default.auth().signInWithPopup(provider)
            .then((result) => {
              this.user = new User(
                result.user.email,
                result.user.displayName,
                this.whatRole(result.user.email),
                result.user.uid
              );
              localStorage.setItem('user', JSON.stringify(this.user));
            });
  }


  whatRole(email): Role {
    const finded = AdminAndOwnerEmails.find(el => el.email === email);
    const role = finded === undefined ? Role.customer : finded.role;
    return role;
  }


  get currentUser(): User {
    return this.user;
  }

}
