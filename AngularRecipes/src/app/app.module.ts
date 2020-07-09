import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
/* import { HttpModule } from '@angular/http'; */
/* import { HttpClient } from '@angular/common/http'; */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { BorrarComponent } from './borrar/borrar.component';
import { HoobbiesModule } from './shared/hobby/hoobbies.module';
import { ServerModule } from './server/server.module';

import { AccountService } from './shared/services/account.service';
import { ShoppingService } from './pages/shopping/services/shopping.service';
import { PostService } from './shared/services/post.service';

import { AuthServerGuard } from './shared/guards/auth-server.guard';
import { CanDeactivateGuard } from './server/components/edit-server/can-deactivate-guard.service';

import {environment} from '../environments/environment';

import {AngularFireModule} from '@angular/fire';
// import {AngularFireDatabaseModule} from '@angular/fire/database';
// import {AngularFirestoreModule} from '@angular/fire/firestore';


const MODULES = [
  SharedModule,
  PagesModule,
  HoobbiesModule,
  ServerModule
];

const FIREBASE = [
 /*  AngularFirestoreModule, */
  /* AngularFireDatabaseModule, */
  /* AngularFireModule.initializeApp (environment.firebaseConfig, 'posts') */
  AngularFireModule.initializeApp (environment.firebaseConfig)
];

@NgModule({
  declarations: [
    AppComponent,
    BorrarComponent
  ],
  imports: [
    BrowserModule,
    ...MODULES,
    AppRoutingModule,
   /* HttpClient */
    ...FIREBASE
  ],

  /* no quiero importar FormsModule aca en import, lo estoy haciendo en shared*/
  // Tenga en cuenta que el AppRoutingModule es el último .
  
  providers: [
    AccountService,
    ShoppingService,
    AuthServerGuard,
    CanDeactivateGuard, // para dejar la ruta
    PostService
  ],
    
  bootstrap: [AppComponent],
  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
