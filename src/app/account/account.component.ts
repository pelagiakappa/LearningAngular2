import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // -->097 Injecting the Logging Service into Components<--
  // -->100 How many Instances of Service Should It Be<--
  // We provide again here the same service `AccountsService` as in
  // the `AppComponent`, that leads to override the instance we'll
  // get from the `AppComponent` (because `AccountComponent` is a
  // child of the `AppComponent`). So, we remove the service
  // `AccountsService` because is creating a new instance of this
  // class and we have an instance of this class already from the
  // `AppComponent`.
  // -->101 Injecting Services into Services<--
  // We comment out `LoggingService` (we put it in the `AppModule`).
  providers: [/*LoggingService*//*, AccountsService*/]
})
export class AccountComponent implements OnInit {
  // -->095 Why would you Need Services<--
  @Input() account: { name: string, status: string };
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{ id: number, newStatus: string }>();

  // -->097 Injecting the Logging Service into Components<--
  constructor(private loggingService: LoggingService,
              private accountsService: AccountsService) {
  }

  ngOnInit() {
  }

  // -->095 Why would you Need Services<--
  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
    // console.log('A server status changed, new status: ' + status);

    // -->097 Injecting the Logging Service into Components<--
    // -->101 Injecting Services into Services<--
    // We comment out this line (we put it in the `AccountsService`).
    // this.loggingService.logStatusChange(status);

    // -->098 Creating a Data Service<--
    this.accountsService.updateStatus(this.id, status);

    // -->102 Using Services for Cross-Component Communication<--
    // We're emitting an event we setup in the service.
    this.accountsService.statusUpdated.emit(status);
  }

}
