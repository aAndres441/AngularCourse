import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeComponent } from './pages/recipe/container/index';
import {RecipeStartComponent,
      RecipeDetailsComponent,
      RecipeItemComponent,
      RecipeListComponent,
      RecipeEditComponent } from './pages/recipe/components/index';

import { PostComponent } from './shared/post/container/index';
import { ActivePostComponent, NewComponent } from './shared/post/component/index';

import { ServerComponent } from './server/container/server.component';
import { EditServerComponent, ListServerComponent, NewServerComponentComponent } from './server/components/index';
import { ServerResolverService } from './server/server-resolver.service';

import { ShoppingComponent } from './pages/shopping/container/shopping/shopping.component';
import { ShoppingListComponent, ShoppingEditComponent } from './pages/shopping/components/index';

import { MyTestComponent } from './shared/my-test/container/my-test/my-test.component';
import { MyTestBindingComponent } from './shared/my-test/components/index';

import { BorrarComponent } from './borrar/borrar.component';
import { PaymentComponent } from './pages/payment/container/payment/payment.component';
import { HomeComponent } from './shared/home/home.component';
import { ErrorComponent } from './shared/error/error.component';
import { GameComponent } from './shared/game/container/game/game.component';
import { LoginComponent } from './shared/login/login.component';
import { ContactComponent } from './shared/contact/contact.component';
import { HobbieComponent } from './shared/hobby/container/hobbie/hobbie.component';

import { AccountComponent } from './pages/account/container/index';
import { MyAccountComponent, NewAccountComponent } from './pages/account/components/index';

import { UserComponent } from './pages/user/container/user/user.component';
import { OneUserComponent,
        ActiveUsersComponent,
        InactiveUsersComponent,
        UserFormComponent,
        UserListComponent,
        UserTestComponent } from './pages/user/components/index';

import { AuthServerGuard } from './shared/guards/auth-server.guard';
import { CanDeactivateGuard } from './server/components/edit-server/can-deactivate-guard.service';


const myRoutes: Routes = [
  
  {path: 'home', component: HomeComponent},
  
  {path: 'users', component: UserComponent, children: [
    {path: 'active', component: ActiveUsersComponent },
    {path: 'usuTest', component: UserTestComponent },
    {path: 'inactive', component: InactiveUsersComponent },
    {path: 'list', component: UserListComponent },
    {path: ':id', component: OneUserComponent },
    {path: ':id/new', component: UserFormComponent },
    
  ]},
/* ,
    {path: ':usuTest', component: UserTestComponent }, */
  /*  {path: ':list', component: UserListComponent }, */
  
  {path: 'recipes', component: RecipeComponent, children: [
    /* {path: '', component: RecipeListComponent}, */
    /* {path: '', component: RecipeItemComponent}, */
    {path: 'start', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailsComponent},
    {path: ':id/edit', component: RecipeEditComponent},
  ]},
 // {path: 'item', component: RecipeItemComponent},
  
  {path: 'shopping', component: ShoppingComponent, children: [
    {path: 'list', component: ShoppingListComponent},
    {path: ':id/edit', component: ShoppingEditComponent}
  ]},
  // {path: 'shopping/:edit', component: ShoppingEditComponent},
    
  { path: 'server',
    // canActivate: [AuthServerGuard], // esto es para usuario registrado sino login
    // component: ServerComponent, canActivate: [AuthServerGuard], // esto es para usuario registrado sino login
    component: ServerComponent, // esto es para usuario registrado sino login

    children: [
      { path: 'new', component: NewServerComponentComponent},
      { path: ':id', component: ListServerComponent },
      /* Le saco esto para que no me llame a servResolve y no entrar a login en Oninit de listServerCompo*/
      /* { path: ':id', component: ListServerComponent, resolve: {servResolve: ServerResolverService} }, */
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
      // le egregamos prop canDeactivate para ejecutar metodo, cada vez que queremos dejar esta RUTA
    ]},
  
  {path: 'test', component: MyTestComponent, children: [
    {path: 'bindeo', component: MyTestBindingComponent},
  ] },

  {path: 'borrar', component: BorrarComponent},
  
  {path: 'account', component: AccountComponent/*, children: [
     {path: ':id', component: NewAccountComponent }
  ]*/},

  {path: 'newId', component: NewAccountComponent},
  
  {path: 'newAcc', component: MyAccountComponent},

  {path: 'post', component: PostComponent, children:  [
    {path: 'new', component: ActivePostComponent}/* ,
    {path: 'new2', component: NewComponent} */
  ] },

  {path: 'newpp', component: NewComponent},

  {path: 'payment', component: PaymentComponent},
  {path: 'error', component: ErrorComponent, data: {mensajito: 'Page not found guy!'}},
  {path: 'game', component: GameComponent },
  {path: 'hobbie', component: HobbieComponent},
  {path: 'login', component: LoginComponent },
  {path: 'contact', component: ContactComponent},

  {path: '', redirectTo: 'home' , pathMatch: 'full'},  // determinada para cuando se carga la app  
  {path: '**', redirectTo: 'error' , pathMatch: 'full'},  // determinada por si n o coincide ninguna direccion y siempre al final,+
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(myRoutes)
    // RouterModule.forRoot(myRoutes, {useHash: true}) // usado por si no anda la url
    /*RouterModule.forRoot(appRoutes,{enableTracing:true} //<-- debugging purposes only)
      */
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
