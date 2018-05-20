// -->096 Creating a Logging Service<--
// log data to console into two different components and somehow this
// log statement it's pretty much the same text. So we basically
// repeating ourselves here, we duplicating code in two different
// components.
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
