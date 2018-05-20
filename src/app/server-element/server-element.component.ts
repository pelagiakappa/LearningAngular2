import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component, ContentChild,
  DoCheck, ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // -->067 More on View Encapsulation<--
  // None => if we define any styles for this component (in the .css file of this component) they will actually get applied globally
  // encapsulation: ViewEncapsulation.None
  // Native => shadow DOM technology
  // encapsulation: ViewEncapsulation.Native
  // Emulated => is the default behavior of angular (so we don't have to added)
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy {
  // -->061 Binding to Custom Properties<--
  // @Input() Decorator => Any Parent Component (e.g. "app") hosting
  // our "server-element" Component (implementing it through it's
  // selector) is able to bind to this property ("element") of the
  // Child Component ("server-element").
  // @Input() => for properties we can set (a value) from outside (app) with Property Binding (bindable from outside)
  // @Input() => Data passed into this component (server-element)
  // @Input() element: { type: string, name: string, content: string }; // : type definition

  // -->062 Assigning an Alias to Custom Properties<--
  @Input('srvElement') element: { type: string, name: string, content: string };

  // -->071 Understanding the Component Lifecycle<--
  // Lifecycle hooks/methods:

  // ngOnChanges => This can be executed multiply times.
  // Is executed right at the start, when a new component is created.
  // It's also always called whenever one of our bound input properties (decorated with @Input) changes, it receive new values.

  // ngOnInit => Called once the component is initialized (it hasn't been displayed in the DOM yet).
  // But our properties can now be accessed and initialized.
  // Will run after the constructor().

  // ngDoCheck => This method is executed multiply times.
  // Called during every change detection run (the system by which angular determines whether something changed on the template of a
  // component, whether actually it needs to change something in the template). Not only if something changed on the template, but
  // on every check (if we click some button which doesn't change
  // anything, but still it's an event and angular has to check if something changed).

  // ngAfterContentInit => Called after content (ng-content) has been projected into view (has been initialized).
  // Not the view of the component itself, but the view of the parent component (especially the part which will get added to our component).

  // ngAfterContentChecked => Called every time the projected content has been checked (Whenever change detection checked this content).

  // ngAfterViewInit => Called after the component's view (and child views) has been initialized.

  // ngAfterViewChecked => Called every time the view (and child views) have been checked.

  // ngOnDestroy => Called once the component is about (right before) to be destroyed. If for example we placed ngIf on it
  // and this get then set to false (and therefore it removes it from the DOM). For cleanup work.

  // -->072 Seeing Lifecycle Hooks in Action<--
  @Input() name: string;

  // -->073 Lifecycle Hooks and Template Access<--
  @ViewChild('heading') header: ElementRef;

  // -->074 Getting Access to ng-content with ContentChild<--
  // @ContentChild => to get access to content which is stored in another component, but then passed on by ng-content.
  // The local reference #contentParagraph from the app component.
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() {
    // -->072 Seeing Lifecycle Hooks in Action<--
    console.log('constructor called!');
  }

  // -->072 Seeing Lifecycle Hooks in Action<--
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes); // {element: SimpleChange}
    // {name: SimpleChange}
    // currentValue: "Testserver"
    // firstChange: true
    // previousValue: undefined

    // After the "Change first Element" button clicked we see:
    // {name: SimpleChange}
    // currentValue: "Changed!"
    // firstChange: false
    // previousValue: "Testserver"
  }

  ngOnInit() {
    // -->072 Seeing Lifecycle Hooks in Action<--
    console.log('ngOnInit called!');

    // -->073 Lifecycle Hooks and Template Access<--
    console.log('Text Content: ' + this.header.nativeElement.textContent); // Text Content:

    // -->074 Getting Access to ng-content with ContentChild<--
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent); // Text Content of paragraph:
  }

  // -->072 Seeing Lifecycle Hooks in Action<--

  ngDoCheck() {
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called!');

    // -->074 Getting Access to ng-content with ContentChild<--
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent); // Text Content of paragraph: Just a test!
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called!');

    // -->073 Lifecycle Hooks and Template Access<--
    console.log('Text Content: ' + this.header.nativeElement.textContent); // Text Content: Testserver
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called!');
  }

}
