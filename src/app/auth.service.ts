// -->134 Protecting Routes with canActivate<--
// Here we want to be able to login or logout.
// This service might reach out to a server and allow us to login or
// logout and check our current authentication state.
export class AuthService {
  loggedIn = false;

  // Method to check the state.
  isAuthenticated() {
    // We want to simulate that this takes some time to finish (maybe we
    // reach out to a server).
    // So, we'll return a `promise`. This `Promise` takes a function as
    // an argument, with the `resolve` and `reject` methods we can
    // execute and in this `Promise` we execute `setTimeout` to wait
    // 800ms and then execute another method in which we `resolve` the
    // `Promise` and return `this.loggedIn`, just to fake that this
    // takes some time to finish.
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );

    return promise;
  }

  // Here we fake this behavior.
  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

}
