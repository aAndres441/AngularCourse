import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTestComponent } from './components/user-test/user-test.component';
import { UserComponent } from './container/user/user.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { InactiveUsersComponent } from './components/inactive-users/inactive-users.component';
import { UserService } from '../../shared/services/user.service';
import { UsersCounterService } from '../../shared/services/users-counter.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { OneUserComponent } from './components/one-user/one-user.component';


const COMPONENTS =
  [
    UserTestComponent,
    UserFormComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    UserListComponent,
    OneUserComponent
  ];

const CONTAINER = [
  UserComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  SharedModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...CONTAINER
  ],
  
  imports: [
   ...MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...CONTAINER,
  ],
  providers: [
    UserService,
    UsersCounterService
  ]
  // estos servicios podrian ser provider en modulo general, ademas podrias estar en cualquier carpeta
})
export class UserModule { }
