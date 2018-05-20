// -->098 Creating a Data Service<--
import {EventEmitter, Injectable} from '@angular/core';

import {LoggingService} from './logging.service';

// -->101 Injecting Services into Services<--
// We have to attach some metadata (@Injectable) to be able to run
// Services into Services. This tells angular that now in this service
// something can be inject it in there. We don't add @Injectable to
// the service we want to inject, but to the service where we want
// to inject something.
@Injectable()
export class AccountsService {
  // It's an array, so it's a reference type.
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  // -->102 Using Services for Cross-Component Communication<--
  statusUpdated = new EventEmitter<string>();

  // -->101 Injecting Services into Services<--
  constructor(private loggingService: LoggingService) {
  }

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});

    // -->101 Injecting Services into Services<--
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;

    // -->101 Injecting Services into Services<--
    this.loggingService.logStatusChange(status);
  }

}

// -->099 Understanding the Hierarchical Injector<--
// - AppModule (in the providers array) => Same Instance of Service is
// available Application-wide, in all components, in all directives
// and in all other services (we can inject services into services).
// - AppComponent => Same Instance of Service is available for all
// Components (the AppComponent and all its child components) (but
// not for other Services).
// - Any other Component => Same Instance of Service is available for
// the Component and all its child components. This Instance
// actually overrides, if we where to provide the same service on a
// higher lever.
