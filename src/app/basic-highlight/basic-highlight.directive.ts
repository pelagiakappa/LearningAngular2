// -->084 Creating a Basic Attribute Directive<--
import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]' // attribute style
})
export class BasicHighlightDirective implements OnInit {

  // We need to get access to the element the directive with selector
  // `appBasicHighlight` sits on. We can inject the element into
  // this Directive (BasicHighlightDirective) with the help of the
  // constructor. On the list of arguments, we list a couple of
  // arguments we want to get, whenever an instance of this class is
  // created by angular.
  // injection => We tell angular to give as a specific type of argument (ElementRef), and angular will try to create it and give it to as.
  // (A reference to the element the directive was placed on.)
  // We put `private` to make the property `elementRef` accessible everywhere in this class.
  constructor(private elementRef: ElementRef) { // injection

  }

  ngOnInit() {
    // We change the DOM by directly accessing the native element.
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }

}
