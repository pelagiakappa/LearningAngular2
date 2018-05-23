import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
// import {ServerComponent} from './server/server.component';
import {ServersComponent} from './servers/servers.component';
import {CockpitComponent} from './cockpit/cockpit.component';
import {ServerElementComponent} from './server-element/server-element.component';
import {BasicHighlightDirective} from './basic-highlight/basic-highlight.directive';
import {BetterHighlightDirective} from './better-highlight/better-highlight.directive';
import {UnlessDirective} from './unless.directive';
import {AccountComponent} from './account/account.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {AccountsService} from './accounts.service';
import {LoggingService} from './logging.service';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {ServerComponent} from './servers/server/server.component';
import {ServersService} from './servers/servers.service';
// import {UserComponent} from './users/user/user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolver} from './servers/server/server-resolver.service';
import {UserComponent} from './user/user.component';
import {UsersService} from './users.service';
import {ServerService} from './server.service';

// -->114 Setting up and Loading Routes<--
const appRoutes: Routes = [
  {path: '', component: HomeComponent}, // localhost:4200
  // {path: 'users', component: UsersComponent}, // localhost:4200/users
  // {path: 'servers', component: ServersComponent}, // localhost:4200/servers
  // -->120 Passing Parameters to Routes<--
  // `:` dynamic part of the path
  // `users/2` we load the UserComponent and now id=2
  // {path: 'users/:id', component: UserComponent},
  // -->121 Fetching Route Parameters<--
  // {path: 'users/:id/:name', component: UserComponent},
  // -->124 Passing Query Parameters and Fragments<--
  // {path: 'servers/:id/edit', component: EditServerComponent},
  // -->126 Practicing and some Common Gotchas<--
  // {path: 'servers/:id', component: ServerComponent},
  // -->127 Setting up Child Nested Routes<--
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]
  },
  {
    path: 'servers', component: ServersComponent, children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent}
    ]
  },
  // -->130 Redirecting and Wildcard Routes<--
  // {path: 'something', component: PageNotFoundComponent}
  {path: 'not-found', component: PageNotFoundComponent},
  // `redirectTo` => redirects to another path
  // {path: 'something', redirectTo: '/not-found'}
  // `**` wildcard route => catch all paths you don't know
  // IMPORTANT: We have to make sure that this very generic route is the last one in our array of routes.
  {path: '**', redirectTo: '/not-found'}
];

// Decorator is a typescript Feature
// NgModule Decorator is a Directive Decorator
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent, // new component that's part of our app
    ServersComponent,
    CockpitComponent,
    ServerElementComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    AccountComponent,
    NewAccountComponent,
    HomeComponent,
    UsersComponent,
    EditServerComponent,
    UserComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [  // it adds some other modules to this module
    BrowserModule,
    FormsModule, // for [(ngModel)]="" to be able to work
    // -->114 Setting up and Loading Routes<--
    // RouterModule.forRoot(appRoutes)
    // -->132 Outsourcing the Route Configuration<--
    // -->157 Module Introduction<--
    AppRoutingModule,
    // -->233 Sending Requests Example POST Request<--
    HttpModule
  ],
  // -->101 Injecting Services into Services<--
  // We're make sure that everything in our application receives the
  // same instance of this service (unless it overrides it).
  // -->134 Protecting Routes with canActivate<--
  // -->137 Controlling Navigation with canDeactivate<--
  // -->139 Resolving Dynamic Data with the resolve Guard<--
  // -->163 Using Subjects to Pass AND Listen to Data<--
  // -->233 Sending Requests Example POST Request<--
  providers: [
    AccountsService,
    LoggingService,
    ServersService,
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    ServerResolver,
    UsersService,
    ServerService
  ],
  bootstrap: [AppComponent] // the root component of our app
})
export class AppModule { // it bundles our code
}
