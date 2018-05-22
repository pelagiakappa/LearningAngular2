// -->139 Resolving Dynamic Data with the resolve Guard<--
// If we want to load the individual server from some backend, then we
// fetch the `id` from there and not from the `ServerComponent`. So,
// we're going to simulate that this takes some time. We need a
// resolver, which is a service and will allow us to run some code
// before a route is rendered. The resolver will always render the
// route (load the component) in the end, but before that it will
// fetch some data the component will then need later on. If we want
// to load the data before actually displaying the route we use the
// resolver. Alternatively, we render the component or the target page
// instantly and in the `ngOnInit` method of this component we could
// then fetch the data and display some spinner will this happens.
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ServersService} from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

// `Resolve` Interface is a generic type and it should wrap which ever
// item or data field we will fetch here in the end (in this case a
// `Server` this resolver will give us (to what it will resolve) in
// the end, synchronously).
@Injectable()
export class ServerResolver implements Resolve<Server> {

  constructor(private serversService: ServersService) {
  }

  // This method will be called by angular when the route (with
  // `resolve` property) is loaded.
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }

}
