import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // -->059 Splitting Apps into Components<--
  newServerName = '';
  newServerContent = '';

  // -->063 Binding to Custom Events<--
  // @Output() Decorator => We want to inform our Parent Component
  // (app) that a new server or a new blueprint was created.
  // @Output() => for properties we want to set as events we can emit
  // new EventEmitter< type definition of the event data we emit >()
  // and then use the Event Binding from outside (app) to catch the data with $event (listenable from outside)
  // @Output() => Data passed out of this component (cockpit)
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  // @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  // -->064 Assigning an Alias to Custom Events<--
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  // -->069 Getting Access to the Template  DOM with ViewChild<--
  // @ViewChild Decorator => getting access to the local-references (fetched through this decorator)
  // @ViewChild(/* the name of a local-reference as a string */)
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  // If we want to select a component we write @ViewChild(/* the component type */)
  // e.g. so in the app.component.ts file (because we use other components there) we can have if we want to @ViewChild(CockpitComponent),
  // to get access to the first occurrence of this CockpitComponent in the AppComponent.

  constructor() {
  }

  ngOnInit() {
  }

  // -->059 Splitting Apps into Components<--
  // onAddServer() {
  // this.serverElements.push({
  //   type: 'server',
  //   name: this.newServerName,
  //   content: this.newServerContent
  // });

  // -->063 Binding to Custom Events<--
  // emit => this will emit a new event of this type (serverCreated)
  //   this.serverCreated.emit({ // set the value of the event data
  //     serverName: this.newServerName,
  //     serverContent: this.newServerContent
  //   });
  // }

  // onAddBlueprint() {
  // this.serverElements.push({
  //   type: 'blueprint',
  //   name: this.newServerName,
  //   content: this.newServerContent
  // });

  // -->063 Binding to Custom Events<--
  //   this.blueprintCreated.emit({
  //     serverName: this.newServerName,
  //     serverContent: this.newServerContent
  //   });
  // }

  // -->068 Using Local References in Templates<--
  onAddServer(nameInput: HTMLInputElement) {
    // console.log(nameInput); // we get back the input element itself, with all its properties
    // console.log(nameInput.value); // we get back the text we write

    // -->069 Getting Access to the Template  DOM with ViewChild<--
    // console.log(this.serverContentInput); // ElementRef {nativeElement: input.form-control}

    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

}
