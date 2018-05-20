import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ServersService} from './servers.service';

@Component({
  selector: 'app-servers', // select elements by name (we use this style always for our custom components)
  // selector: '[app-servers]', // select elements by [] attribute
  // selector: '.app-servers', // select elements by . class
  templateUrl: './servers.component.html',
  // template: '<app-server></app-server><app-server></app-server>',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  // -->024 Property Binding<--
  allowNewServer = false;
  // -->026 Event Binding<--
  // serverCreationStatus = 'No server was created!';
  // -->028 Passing and Using Data with Event Binding<--
  // serverName = '';
  // -->029 Two-Way-Databinding<--
  serverName = 'Testserver';
  // -->033 Using ngIf to Output Data Conditionally<--
  serverCreated = false;
  // -->037 Outputting Lists with ngFor<--
  // servers = ['Testserver', 'Testserver 2'];

  // -->112 Why do we need a Router<--
  servers: { id: number, name: string, status: string }[] = [];

  // -->112 Why do we need a Router<--
  // -->119 Using Relative Paths in Programmatic Navigation<--
  constructor(private serversService: ServersService,
              private router: Router,
              // injects the currently active route
              private route: ActivatedRoute) {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
    // -->112 Why do we need a Router<--
    this.servers = this.serversService.getServers();
  }

  onCreateServer() {
    // -->026 Event Binding<--
    // this.serverCreationStatus = 'Server was created!';
    // -->031 Combining all Forms of Databinding<--
    // this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
    // -->033 Using ngIf to Output Data Conditionally<--
    this.serverCreated = true;
    // -->037 Outputting Lists with ngFor<--
    // this.servers.push(this.serverName);
  }

  // -->028 Passing and Using Data with Event Binding<--
  onUpdateServerName(event: Event) {
    // console.log(event);
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  // -->119 Using Relative Paths in Programmatic Navigation<--
  onReload() {
    // With the routerLink we did get an error when we where using the
    // relative path here in this component. But now we don't get an
    // error when we're using the navigate method, which is wrong. So,
    // we have to specify where we are `relativeTo`.
    this.router.navigate(['servers'], // relative path
      {relativeTo: this.route}); // so now we get an error
  }

}
