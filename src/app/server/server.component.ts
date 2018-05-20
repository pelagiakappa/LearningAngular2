import {Component} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online {
      color: white;
    }
  `]
})
export class ServerComponent {
  // 023 String Interpolation
  serverId = 10;
  serverStatus = 'offline';

  constructor() {
    // -->035 Styling Elements Dynamically with ngStyle<--
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  // A method definition:
  getServerStatus() {
    return this.serverStatus;
  }

  // -->035 Styling Elements Dynamically with ngStyle<--
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
