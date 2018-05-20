import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // -->097 Injecting the Logging Service into Components<--
  // We provide a service, we simple tell angular how to create it.
  // -->100 How many Instances of Service Should It Be<--
  // We provide again here the same service `AccountsService` as in
  // the `AppComponent`, that leads to override the instance we'll
  // get from the `AppComponent` (because `NewAccountComponent` is a
  // child of the `AppComponent`). So, we remove the service
  // `AccountsService` because is creating a new instance of this
  // class and we have an instance of this class already from the
  // `AppComponent`.
  // -->101 Injecting Services into Services<--
  // We comment out `LoggingService` (we put it in the `AppModule`).
  providers: [/*LoggingService*//*, AccountsService*/]
})
export class NewAccountComponent implements OnInit {
  // -->095 Why would you Need Services<--
  @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();

  // -->097 Injecting the Logging Service into Components<--
  // Dependency/Hierarchical Injector
  // Dependency => A class of ours will depend on. For example the
  // `new-account.component` depends on that `logging.service`
  // because we want to call a method in that service.
  // Dependency Injector => injects this dependency, injects an
  // instance of this class into our component automatically.
  // The type of the property `loggingService` has to be the class
  // we want to get injected, `LoggingService` in this case.
  constructor(private loggingService: LoggingService,
              private accountsService: AccountsService) {

    // -->102 Using Services for Cross-Component Communication<--
    // We want to listen to the event that lives in the service.
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  ngOnInit() {
  }

  // -->095 Why would you Need Services<--
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    // console.log('A server status changed, new status: ' + accountStatus);

    // -->096 Creating a Logging Service<--
    // WRONG WAY: it works but it's the wrong way to use services
    // We shouldn't create the instances manually.
    // const service = new LoggingService();
    // service.logStatusChange(accountStatus);

    // -->097 Injecting the Logging Service into Components<--
    // -->101 Injecting Services into Services<--
    // We comment out this line (we put it in the `AccountsService`).
    // this.loggingService.logStatusChange(accountStatus);

    // -->098 Creating a Data Service<--
    this.accountsService.addAccount(accountName, accountStatus);
  }

}
