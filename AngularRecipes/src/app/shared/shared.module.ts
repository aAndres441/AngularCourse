import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/*import { HttpClientModule } from '@angular/common/http'; */

import { MyTestModule } from './my-test/my-test.module';
import { GameModule } from './game/game.module';
import { ErrorModule } from './error/error.module';
import { PostModule } from './post/post.module';

import { FooterComponent } from './footer/footer.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccesAlertComponent } from './succes-alert/succes-alert.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { StarComponent } from './star/star.component';
import { OrderComponent } from './order/component/order.component';

import { DirectiveBasicHighLight } from './directives/directives-basic-highlight/directiv-basic.directive';
import { DirectivBetterDirective } from './directives/directiveBetter/directiv-better.directive';
import { DirectiveOpositeDirective } from './directives/directivOposite/directive-oposite.directive';
import { DirectiveCardDirective } from './directives/directivCard/directive-card.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { CountClickComponent } from './directives/countClick/count-click/count-click.component';

import { AuthGuard } from './guards/auth.guard';

import { ConvertToKPipe } from './pipes/convert-to-k.pipe';
import { ModalComponentComponent } from './modal/modal-component/modal-component.component';
import { IncrementalComponent } from './helpers/incrementReusable/incremental/incremental.component';

const COMPONENTS = [
  FooterComponent,
  WarningAlertComponent,
  SuccesAlertComponent,
  HeaderComponent,
  NavbarComponent,
  LoginComponent,
  DirectiveBasicHighLight,
  DirectivBetterDirective,
  DirectiveOpositeDirective,
  DirectiveCardDirective,
  DropdownDirective,
  HomeComponent,
  StarComponent,
  ConvertToKPipe,
  ContactComponent,
  OrderComponent,
  ModalComponentComponent,
  CountClickComponent,
  IncrementalComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  // HttpClientModule,
  RouterModule,
  ErrorModule,
  MyTestModule,
  GameModule,
  PostModule
];

@NgModule({

  providers: [
    AuthGuard
  ],

  declarations: [
    ...COMPONENTS,
  ],

  imports: [
    ...MODULES
  ],

  exports: [
    ...COMPONENTS,
    ...MODULES
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class SharedModule { }
