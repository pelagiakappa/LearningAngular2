// -->233 Sending Requests Example POST Request<--
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

// We will inject a service into this service (the built-in angular
// `Http` service, which enables us to send requests)
@Injectable()
export class ServerService {

  constructor(private http: Http) {
  }

  storeServers(servers: any[]) {

    // -->234 Adjusting Request Headers<--
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    // We want to send a request/reach out to the backend to store my
    // `servers` array there. We send a `post` request to the backend
    // to post/add/store our data to the server. In firebase, with the
    // `post` request we will append it to any existing elements in
    // the database (the `put` request will overwrite it).
    // Angular is using Observables behind the seen, that means that
    // we don't send the request like this, the `post` method will
    // only create an Observable (that Observable wraps our request,
    // but it's not sending it yet). We have to subscribe to that
    // Observable and react to any response we get back. We will
    // subscribe there where we call this method `storeServers`, so we
    // return the Observable we get here.
    // return this.http.post('https://udemy-ng-http-267b0.firebaseio.com/data.json', servers);

    // -->234 Adjusting Request Headers<--
    // return this.http.post('https://udemy-ng-http-267b0.firebaseio.com/data.json', servers, {headers: headers});

    // -->236 Sending a PUT Request<--
    // The `put` request we'll overwrite the existing data (in firebase)
    return this.http.put('https://udemy-ng-http-267b0.firebaseio.com/data.json', servers, {headers: headers});

  }

  // -->235 Sending GET Requests<--
  // This method doesn't take any arguments, but it should prepare a
  // request (wrap it in an Observable), which allows us to reach out
  // to our backend and get back the data.
  getServers() {
    // return this.http.get('https://udemy-ng-http-267b0.firebaseio.com/data.json');

    // ->237 Transform Responses Easily with Observable Operators map<-
    // We're doing the transformation of the data (from JSON to
    // javascript object) here, which is much better then doing it in
    // a component where we would have to repeat it across multiply
    // components if we would make this http call (if we subscribe to
    // it) for multiply components.
    // return this.http.get('https://udemy-ng-http-267b0.firebaseio.com/data.json')
    //   .map(
    //     (response: Response) => {
    //       const data = response.json();
    //       return data;
    //     }
    //   );

    // -->238 Using the Returned Data<--
    // So, afterwards we see to the console:
    // 0: {capacity: 10, id: 9830, name: "FETCHED_Testserver"}
    // 1: {capacity: 100, id: 836, name: "FETCHED_Liveserver"}
    // return this.http.get('https://udemy-ng-http-267b0.firebaseio.com/data.json')
    //   .map(
    //     (response: Response) => {
    //       const data = response.json();
    //       for (const server of data) { // `data` is our array of servers
    //         server.name = 'FETCHED_' + server.name;
    //       }
    //       return data;
    //     }
    //   );

    // -->239 Catching Http Errors<--
    // The `catch` operator will not wrap our data into an Observable
    // automatically. So we call the `throw` method of an Observable
    // and we passing the error response to it.
    return this.http.get('https://udemy-ng-http-267b0.firebaseio.com/data')
      .map(
        (response: Response) => {
          const data = response.json();
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          // console.log(error);
          // return Observable.throw(error);
          return Observable.throw('Something went wrong');
        }
      );

  }

  // -->240 Using the async Pipe with Http Requests<--
  // We add `.json` at the end of the URL because is important.
  getAppName() {
    return this.http.get('https://udemy-ng-http-267b0.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

}
