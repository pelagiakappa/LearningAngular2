import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  // -->138 Passing Static Data to a Route<--
  errorMessage: string;

  // -->138 Passing Static Data to a Route<--
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // -->138 Passing Static Data to a Route<--
    this.errorMessage = this.route.snapshot.data['message'];
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }

}
