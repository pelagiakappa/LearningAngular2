// -->134 Protecting Routes with canActivate<--
// We want to protect some of our routes, and we can use a feature
// offered by angular `Guards`, which allows us to run some code
// at a point of time defined by us. So, we implement the `CanActivate`
// Interface, which forces us to have a `canActivate` method. Angular
// should execute this code in the `canActivate` method, before a
// route is loaded.
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  // `canActivate` returns either an Observable (it will in the end
  // resolve to a boolean, true or false value) or alternatively this
  // route returns a Promise (also returning boolean in the end) or it
  // returns just a boolean. So `canActivate` can run both
  // asynchronously (we might have some code which take a couple of
  // seconds to finish, because we might use a `timeout` in there or
  // we reach out to a server) (returning an Observable or a Promise)
  // or synchronously (because we might have some guards which execute
  // some code which runs completely on the client).
  // `canActivate` allows to control access to wherever is control by
  // this `canActivate` guard here.
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Here we want to check whether the user is logged in or not.
    // The `isAuthenticated` method returns a `Promise`, so we want to
    // be able to handle that (with the use of the `then` method),
    // whenever this `Promise` in the `AuthService` resolves. We'll
    // get back a boolean (the authentication state, the `loggedIn`
    // boolean is what we `resolve` in the `AuthService`).
    // And in the end we return still this `Promise`, because if we
    // return something inside of a `Promise`, it will give us back
    // another `Promise`.
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            // We want to navigate away, because we don't want to
            // allow the user access to the route he wanted to go to
            // originally, to force the user to go somewhere else.
            this.router.navigate(['/']);
          }
        }
      );
  }

  // -->135 Protecting Child Nested Routes with canActivateChild<--
  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
