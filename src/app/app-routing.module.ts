// -->132 Outsourcing the Route Configuration<--
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {ServerComponent} from './servers/server/server.component';
import {ServersComponent} from './servers/servers.component';
import {UserComponent} from './users/user/user.component';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolver} from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  {
    path: 'servers', component: ServersComponent,
    // -->134 Protecting Routes with canActivate<--
    // `canActivate` this will make sure that `servers` and all its
    // child routes, is now only accessible if in the `AuthGuard` the
    // `canActivate` method returns true in the end (which will only
    // happen if in the `AuthService` the `loggedIn` is set to true.
    // canActivate: [AuthGuard],
    // -->135 Protecting Child Nested Routes with canActivateChild<--
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':id', component: ServerComponent,
        // -->139 Resolving Dynamic Data with the resolve Guard<--
        // The `resolve` takes an object and key-value pairs. The key
        // name of the property is totally up to us (here `server`).
        // So, this will now map the data this resolver gives us back
        // (here it gives us back a `Server`) and will be stored in
        // this `server` property.
        resolve: {server: ServerResolver}
      },
      {
        path: ':id/edit', component: EditServerComponent,
        // -->137 Controlling Navigation with canDeactivate<--
        // So, angular will run this guard whenever we try to leave
        // this path here, this component loaded at this path.
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  // {path: 'not-found', component: PageNotFoundComponent},
  // -->138 Passing Static Data to a Route<--
  {
    path: 'not-found', component: ErrorPageComponent,
    data: {message: 'Page not found!'}
  },
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // -->140 Understanding Location Strategies<--
    // The routes works fine here on our local setup, but if we
    // hosting this on a real server (somewhere in the web) the routes
    // might not work. Because, the routes/the url are always
    // parsed/handled by the server (which host our application)
    // first, not by angular as we have here in our local setup.
    // If the server don't know that route, so in case of a `404 Not
    // Found` error, we have to make sure that our web server returns
    // the `index.html` file. In other cases where we can't return it
    // (for support of very old browsers maybe) we use:
    // RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  // `exports` simple tells angular => from this module
  // `AppRoutingModule` (if I were to add this module
  // `AppRoutingModule` to the imports of another module `AppModule`)
  // what should be accessible to this module `AppModule` which
  // imports this module `AppRoutingModule`.
  exports: [RouterModule]
})
export class AppRoutingModule {

}
