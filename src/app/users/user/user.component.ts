import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  // -->112 Why do we need a Router<--
  user: { id: number, name: string };
  // -->123 An Important Note about Route Observables<--
  paramsSubscription: Subscription;

  // -->121 Fetching Route Parameters<--
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // -->121 Fetching Route Parameters<--
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // -->122 Fetching Route Parameters Reactively<--
    // To be able to react to subsequent changes.
    // `params` is an Observable (= a feature which allows us to
    // easily work with asynchronous tasks).
    // The parameters of our currently loaded route might change at
    // same point in the future, if the user click this link, but we
    // don't know when, we don't know if and we don't know how long
    // it'll take. So we can block our code and wait for this to
    // happen here, because it might never happen.
    // An Observable is an easy way to subscribe to some event, which
    // might happen in the future, to then execute some code when it
    // happens, without having to wait for it now. The code which
    // executed is the first argument of the `subscribe` method, which
    // is a function (here a ES6 arrow function).
    // this.route.params
    //   .subscribe(
    //     (params: Params) => { // the updated params as an argument
    //       this.user.id = params['id'];
    //       this.user.name = params['name'];
    //     }
    //   );

    // -->123 An Important Note about Route Observables<--
    // This returns us the subscription.
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );

  }

  // -->123 An Important Note about Route Observables<--
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
