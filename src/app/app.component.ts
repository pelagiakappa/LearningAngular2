import {Component, OnInit} from '@angular/core';

import {AccountsService} from './accounts.service';
import {UsersService} from './users.service';

// Decorator is a typescript Feature
// Component Decorator is a Directive Decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // styles: [`
  //   h3 {
  //     color: dodgerblue;
  //   }
  // `]
  // -->098 Creating a Data Service<--
  // -->101 Injecting Services into Services<--
  // We remove from here the service `AccountsService` and we add
  // it in the providers array in the highest level (AppModule).
  providers: [/*AccountsService*/]
})
export class AppComponent implements OnInit {
  // -->006 Editing the First App<--
  // title = 'Does this change?';
  // name = '';
  // -->038 Getting the Index when using ngFor<--
  showSecret = false;
  log = [];
  // -->055 Understanding Angular Error Messages<--
  servers = [];
  // -->058 Module Introduction<--
  newServerName = '';
  newServerContent = '';
  // serverElements = [];
  // -->061 Binding to Custom Properties<--
  serverElements = [{
    type: 'server',
    name: 'Testserver',
    content: 'Just a test!'
  }]; // = assign a value
  // -->081 Module Introduction<--
  numbers = [1, 2, 3, 4, 5];
  onlyOdd = false;
  // -->082 ngFor and ngIf Recap<--
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  // -->092 Understanding ngSwitch<--
  // value = 10;
  value = 5;

  // -->095 Why would you Need Services<--
  // accounts = [
  //   {
  //     name: 'Master Account',
  //     status: 'active'
  //   },
  //   {
  //     name: 'Testaccount',
  //     status: 'inactive'
  //   },
  //   {
  //     name: 'Hidden Account',
  //     status: 'unknown'
  //   }
  // ];

  // -->098 Creating a Data Service<--
  accounts: { name: string, status: string }[] = [];

  // -->163 Using Subjects to Pass AND Listen to Data<--
  user1Activated = false;
  user2Activated = false;

  // -->098 Creating a Data Service<--
  // -->163 Using Subjects to Pass AND Listen to Data<--
  constructor(private accountsService: AccountsService,
              private usersService: UsersService) {
  }

  // -->098 Creating a Data Service<--
  ngOnInit() {
    // Because accounts in the service it's a reference type. We
    // just getting access to the exact same array as stored in the
    // service.
    this.accounts = this.accountsService.accounts;

    // -->163 Using Subjects to Pass AND Listen to Data<--
    // Here, we use the `Observable` part by subscribe to it.
    this.usersService.userActivated.subscribe(
      (id: number) => {
        if (id === 1) {
          this.user1Activated = true;
        } else if (id === 2) {
          this.user2Activated = true;
        }
      }
    );

  }

  // -->038 Getting the Index when using ngFor<--
  onToggleDetails() {
    this.showSecret = !this.showSecret;
    // this.log.push(this.log.length + 1); // log an increment number
    this.log.push(new Date()); // log a timestamp
  }

  // -->055 Understanding Angular Error Messages<--
  // onAddServer() {
  //   this.servers.push('Another Server');
  // }

  onRemoveServer(id: number) {
    // -->056 Debugging Code in the Browser Using Sourcemaps<--
    // Logical error
    // const position = id + 1;
    // this.servers.splice(position, 1);

    this.servers.splice(id, 1);
  }

  // -->058 Module Introduction<--
  onAddServer() {
    this.serverElements.push({
      type: 'server',
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.serverElements.push({
      type: 'blueprint',
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  // -->063 Binding to Custom Events<--
  // These methods will only be executed after these buttons have been clicked, ones we really already are done creating the server.
  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  // -->072 Seeing Lifecycle Hooks in Action<--
  onChangeFirst() {
    // e.g. we want to change the name of the first element
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    // e.g. we want to remove only the first object in the array
    this.serverElements.splice(0, 1);
  }

  // -->095 Why would you Need Services<--
  onAccountAdded(newAccount: { name: string, status: string }) {
    this.accounts.push(newAccount);
  }

  onStatusChanged(updateInfo: { id: number, newStatus: string }) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
  }

}
