// -->132 Outsourcing the Route Configuration<--
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ServerComponent} from './servers/server/server.component';
import {UserComponent} from './users/user/user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ServersComponent} from './servers/servers.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  // -->134 Protecting Routes with canActivate<--
  // `canActivate` this will make sure that `servers` and all its
  // child routes, is now only accessible if the `AuthGuard`
  // `canActivate` method returns true in the end (which will only
  // happen if in the `AuthService` `loggedIn` is set to true.
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    // -->135 Protecting Child Nested Routes with canActivateChild<--
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent},
      // -->137 Controlling Navigation with canDeactivate<--
      {
        path: ':id/edit', component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  // `exports` simple tells angular => from this module (if I were to
  // add this module to the imports of another module) what should be
  // accessible to this module which imports this module
  exports: [RouterModule]
})
export class AppRoutingModule {

}
