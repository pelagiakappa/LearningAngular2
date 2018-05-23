import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {UsersService} from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // -->157 Module Introduction<--
  id: number;

  // -->157 Module Introduction<--
  // -->163 Using Subjects to Pass AND Listen to Data<--
  constructor(private route: ActivatedRoute,
              private usersService: UsersService) {
  }

  ngOnInit() {
    // -->157 Module Introduction<--
    //
    // `Observable` => Various Data Sources: (asynchronous tasks)
    // (User Input) Events (e.g. connected to a button and when it is
    // clicked an event/data package is emitted automatically), Http
    // Requests (returns the response which is emitted as a data
    // package), Triggered in Code (programmatically), ...
    //
    // `Observer` => Handle Data | Handle Error | Handle Completion
    // So, we have 3 types of data packages we can receive.
    // We write the code which gets executed!

    // -->158 Analyzing a Built-in Angular Observable<--
    // We're using the `params` Observable, to handle the changes of
    // these router parameters. Here, in the `subscribe` method this
    // actually is our `Observer` part (we write the code which gets
    // executed).
    // The `subscribe` method always takes 3 arguments /callbacks anonymous functions.

    this.route.params
      .subscribe(
        // Handle the normal data callback.
        (params: Params) => {
          this.id = +params['id'];
        },
        // -->158 Analyzing a Built-in Angular Observable<--
        // Gets executed in a case of an error.
        () => {
        },
        // Gets executed if the observable completes.
        () => {
        }
      );
  }

  // -->163 Using Subjects to Pass AND Listen to Data<--
  // A `Subject` is `Observable` and `Observer` at the same time.
  // We pushing a new data package which contains `this.id`.
  // Here, we use the `Observer` part by pushing a new value.
  onActivate() {
    this.usersService.userActivated.next(this.id);
  }

}
