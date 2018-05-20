import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ServersService} from '../servers.service';
import {CanComponentDeactivate} from './can-deactivate-guard.service';
import {Observable} from 'rxjs/Observable';

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
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // -->112 Why do we need a Router<--
    // this.server = this.serversService.getServer(1);

    // -->137 Controlling Navigation with canDeactivate<--
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // Subscribe route params to update the id if params change
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );

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
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // -->137 Controlling Navigation with canDeactivate<--
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name ||
      this.serverStatus !== this.server.status) &&
      !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
