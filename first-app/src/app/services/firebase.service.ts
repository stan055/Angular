import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ImgUrl, IProduct } from '../interfaces/IProduct';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getRandomInt } from './random-int';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  constructor(public firestore: AngularFirestore,
              private firestorage: AngularFireStorage) {}

  createProduct(product: IProduct, shouldBeUpload: File[], collection = 'product'): Promise<any> {

    return this.firestore.collection(collection).add(product)
      .then(resProduct => {
        console.log('Successful add product ' + resProduct.id);
        shouldBeUpload.forEach(file => {
           this.uploadImgFile(file, resProduct.id);
        });
      }).catch(error => console.log('createProduct => ', error));
  }


  editProductById(editedProduct: IProduct, shouldBeUpload: File[], shouldBeDeleted: ImgUrl[],
                  collection = 'product'): Promise<any> {

    return this.getDocIdByProductId(editedProduct.id)
      .then(docId => {
        this.firestore.collection(collection).doc(docId).set(editedProduct)
          .then(() => console.log('Successful set product ' + docId))
          .then(() => {
            shouldBeUpload.forEach(file => {
              this.uploadImgFile(file, docId);
            });
          }).then(() => {
              shouldBeDeleted.forEach(file => {
                this.deleteFileFromStorage(file.path);
              });
            });
          }).catch(error => console.log('editProductById => ', error));
  }


  deleteFileFromStorage(path: string): Promise<any> {
    return this.firestorage.storage.ref().child(path).delete()
            .then(() => console.log('File deleted => ' + path))
            .catch((error) => console.log('Error delete file => ' + path + ' ', error));
  }


  uploadImgFile(file: File, docId: string, folder = 'images/', collection = 'product'): Promise<any> {

    const path = folder + getRandomInt(999) + file.name;
    const ref = this.firestorage.ref(path);

    return ref.put(file)
      .then((task) => {
        task.ref.getDownloadURL()
          .then((imgUrl) => {
            this.firestore.collection(collection).doc(docId)
              .update({
                imgUrl: firebase.default.firestore.FieldValue.arrayUnion({ imgUrl, path: task.metadata.fullPath })
              }).then(() => {
                console.log('Document successfully written! => ', task.metadata.fullPath);
              })
              .catch((error) => {
                console.error('Error writing document: ', error);
              });
          });
      });

  }


  getProductsCollection(collection: string): Observable<any> {
    return this.firestore.collection(collection)
      .valueChanges();
  }


  getProductById(id: number, collection: string): Observable<any> {
    return this.firestore.collection(collection,  ref => ref.where('id', '==', id))
      .valueChanges();
  }

  // Get document path id by product id
  getDocIdByProductId(productId: number, collection = 'product'): Promise<any> {
    let docId: string;
    return this.firestore.collection(collection)
            .ref.where('id', '==', productId).limit(1)
              .get()
              .then((querySnapshot) => {
                return querySnapshot.forEach(el => {
                    docId = el.id;
                  });
                }).then(() => {
                  console.log('Successful getDocIdByProductId => ' + docId);
                  return docId;
                }).catch((error) => {
                  console.log('Error getDocIdByProductId => ', error);
                });
  }


  deleteProductById(id: number, collection: string): Promise<any> {
    let docId: string;
    const products = this.firestore.collection(collection,  ref => ref.where('id', '==', id));

    return products.get().toPromise()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                docId = doc.id;
                doc.data().imgUrl.forEach(element => {
                  this.deleteFileFromStorage(element.path);
                });
            });
            }).then(() =>
                this.firestore.collection(collection).doc(docId).delete()
            ).then(() => console.log('Document deleted => ' + docId))
            .catch((error) => console.log('Error delete document => ' + docId + ' ', error));
  }

}
