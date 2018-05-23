import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // -->161 Unsubscribe<--
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  // -->118 Navigating Programmatically<--
  // We inject the Router.
  // -->136 Using a Fake Auth Service<--
  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    // -->159 Building  Using a First Simple Observable<--
    // My own Observable here should emit some sending numbers and
    // that in a fixed interval. `interval` is a very simple way of
    // creating a new Observable. We pass a number, and that would be
    // the milliseconds it should wait between emitting data
    // automatically: `1000` to emit a new piece of data every
    // second. This is our own Observable working, here the data
    // source is a normal timer (simple using a little utility
    // function `interval` which is available in the `rxjs` package).
    // const myNumbers = Observable.interval(1000);

    // -->164 Understanding Observable Operators<--
    // Operators/rxjs => allow us to transform the data we receive to
    // something else and still stay inside our Observable world.
    // We chain an Operator `map` to the `Observable.interval` method.
    // The Operators can be used on any Observable (we have to import
    // them from 'rxjs/Rx'). The `map` Operator maps the data we get
    // back into a new Observable with any transformation of our
    // choice, and it should return the transformed data.
    // Since, Operators simple return new Observables, we can of
    // course also chain these Operators!
    const myNumbers = Observable.interval(1000)
      .map(
        (data: number) => {
          return data * 2; // is printed to the console: 0 2 4 6 ...
        }
      );

    // -->161 Unsubscribe<--
    this.numbersObsSubscription = myNumbers.subscribe(
      (number: number) => {
        // Its second a new number is printed to the console.
        console.log(number); // 0 1 2 3 ...
      }
    );

    // -->160 Building  Using a Custom Observable from Scratch<--
    // Here, we want to create an Observable which will fire after 2
    // seconds and after 4 seconds and which will also fail after 5
    // seconds or alternatively if it completes.
    // `create` method takes a function as an argument, and this
    // function should hold our asynchronous code.
    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          // `next` emits a normal data package
          observer.next('first package');
        }, 2000);
        setTimeout(() => {
          observer.next('second package');
        }, 4000);
        setTimeout(() => {
          // `error` emits an error with a message in case of a fail
          // observer.error('this does not work');
          // `complete` when the observable is completed
          observer.complete();
        }, 5000);
        setTimeout(() => {
          observer.next('third package');
        }, 6000);
      }
    );
    // -->161 Unsubscribe<--
    this.customObsSubscription = myObservable.subscribe(
      // The first argument (the callback which gets triggered on a normal data package).
      (data: string) => {
        console.log(data);
      },
      // The second argument (the callback which gets triggered in case of an error).
      (error: string) => {
        console.log(error);
      },
      // The third argument (the callback which gets triggered when the observable is completed).
      () => {
        console.log('completed');
      }
    );

  }

  // -->161 Unsubscribe<--
  ngOnDestroy() {
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

  // -->118 Navigating Programmatically<--
  onLoadServers() {
    // ... complex calculation
    this.router.navigate(['/servers']); // absolute path
  }

  // -->124 Passing Query Parameters and Fragments<--
  // We passing the `id` to navigate, so this gets more dynamic
  // (now we aren't hard-coding `5` or something like this).
  onLoadServer(id: number) {
    // ... complex calculation
    this.router.navigate(['/servers', id, 'edit'],
      {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  // -->136 Using a Fake Auth Service<--
  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

}
