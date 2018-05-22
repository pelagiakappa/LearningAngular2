import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {ServersService} from '../servers.service';
import {CanComponentDeactivate} from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  // -->112 Why do we need a Router<--
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  // -->128 Using Query Parameters - Practice<--
  allowEdit = false;
  // -->137 Controlling Navigation with canDeactivate<--
  changesSaved = false;

  // -->112 Why do we need a Router<--
  // -->125 Retrieving Query Parameters and Fragments<--
  // -->137 Controlling Navigation with canDeactivate<--
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // -->137 Controlling Navigation with canDeactivate<--
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // Subscribe to route params to update the id if params change.
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
    // -->112 Why do we need a Router<--
    // this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    // -->125 Retrieving Query Parameters and Fragments<--
    console.log(this.route.snapshot.queryParams); // {allowEdit: "1"}
    console.log(this.route.snapshot.fragment); // loading
    // The alternative way to be able to react to changes is:
    // this.route.queryParams.subscribe();
    this.route.fragment.subscribe();

    // -->128 Using Query Parameters - Practice<--
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
  }

  // -->112 Why do we need a Router<--
  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName, status: this.serverStatus
    });

    // -->137 Controlling Navigation with canDeactivate<--
    this.changesSaved = true;
    // We go up one level, to the last loaded server.
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // -->137 Controlling Navigation with canDeactivate<--
  // Whenever the user tries to accidentally navigate away (before
  // clicks the Update Server button) we want to prevent him for doing
  // so or at least ask if he really wants to leave. So, we execute
  // the code for `canDeactivate` guard in this component here,
  // because we will need access to the `changesSaved` boolean, which
  // informs us on whether this Update Server button was clicked or not.
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // If we aren't allow to edit in the first place sure you may leave.
    if (!this.allowEdit) {
      return true;
    }
    // If the changes we're not saved, so `changesSaved` is false.
    if ((this.serverName !== this.server.name ||
      this.serverStatus !== this.server.status) &&
      !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      // Otherwise either nothing was changed or it was changed but
      // `changesSaved` was set to true, so we did save it indeed.
      return true;
    }
  }

}
