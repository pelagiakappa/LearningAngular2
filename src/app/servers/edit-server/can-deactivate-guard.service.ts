// -->137 Controlling Navigation with canDeactivate<--
// A `Guard` always needs to be a service, because we need to provide it
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

// A Interface is a contract which can be implemented by some other
// component, which forces this component to provide some logic.
// An Interface it'll only contain the type definition of the method
// (the information how it should look like), it won't contain the
// actual logic.
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// `CanDeactivate` Interface is actually a generic type and it will
// wrap are own Interface `<CanComponentDeactivate>`. So, it wraps an
// Interface which forces some component or some class to implement
// the `canDeactivate` method.
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  // This is the `canDeactivate` method which will be called by the
  // angular router ones we try to leave a route. This method will be
  // called at the end, ones we want to leave a route (hence the
  // optional `nextState` argument).
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // We call the `canDeactivate` method of the `component` we
    // currently on `EditServerComponent`, because there is where we
    // will actually implement the logic, checking whether we're
    // allowed to leave or not.
    return component.canDeactivate();
  }

}
