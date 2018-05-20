// -->091 Building a Structural Directive<--
// We create the opposite of the ngIf directive.
// This directive here `appUnless` will attach something only if the
// condition is false (ngIf does that if the condition is true).
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // Property name `appUnless` (must be the same as the selector),
  // which is the condition we get. But whenever this condition
  // changes, we want to execute a method. So we can implement a
  // setter. This now turns this into a method. Technically though
  // this still is a property, it's just the setter of the property,
  // which is a method, which get executed whenever the property
  // changes (which is whenever the condition we pass changes or
  // some input parameter of this condition changes).
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // If the condition is not true, we display something.
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // If the condition is true, we display nothing.
      this.vcRef.clear();
    }
  }

  // templateRef => gives us access to the ng-template the directive sits on.
  // vcRef => where should we render it. That marks the place where we placed this directive in the document.
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { // injection
  }

}
