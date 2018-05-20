import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ServersService} from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  // -->112 Why do we need a Router<--
  server: { id: number, name: string, status: string };

  // -->112 Why do we need a Router<--
  // -->126 Practicing and some Common Gotchas<--
  // -->128 Using Query Parameters - Practice<--
  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // -->112 Why do we need a Router<--
    // this.server = this.serversService.getServer(1);

    // -->126 Practicing and some Common Gotchas<--
    // We convert the value of `id` from string to a number with `+`.
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
        }
      );
  }

  // -->128 Using Query Parameters - Practice<--
  onEdit() {
    // -->129 Configuring the Handling of Query Parameters<--
    // `queryParamsHandling` ==> 'merge' to merge our old queryParams
    // with any new we might add here ==> or 'preserve' (overrides the
    // default behavior = which is to simple drop them) makes sure
    // that the old ones are kept (in this case if we where to add new
    // ones here, then the old ones would actually override the new
    // ones = so in this case we should use 'merge')
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
