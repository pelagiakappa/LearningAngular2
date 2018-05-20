// -->134 Protecting Routes with canActivate<--
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    // just to fake that this takes a couple of seconds to finish
    const promise = new Promise(
      (resolve, reject) => {
        // wait 800ms and then execute the callback function
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
