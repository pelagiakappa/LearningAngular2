// -->163 Using Subjects to Pass AND Listen to Data<--
// A `Subject` basically is like an `Observable` but it allow us to
// push it to emit a new data during our code.
// We're using `Subject` to have `Observable` and `Observer` in one
// convenient object. It kind of is comparable to the `EventEmitter`
// cause actually is built on such a `Subject`. So, when we want to
// implement cross component communication we using `Subject` instead
// of `EventEmitter` (`next` instead of `emit` is the function to push
// a new value and then `subscribe` is the one to consume it).
import {Subject} from 'rxjs/Subject';

export class UsersService {
  userActivated = new Subject();
}
