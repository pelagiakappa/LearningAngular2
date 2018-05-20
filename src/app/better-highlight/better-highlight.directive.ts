// -->085 Using the Renderer to build a Better Attribute Directive<--
import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  // -->088 Using HostBinding to Bind to Host Properties<--
  // The `HostBinding` decorator allows us to not use the Renderer.
  // We bind it to some property (backgroundColor) which value is important.
  // We pass it a string defining to which property of the hosting element we want to bind ('style.backgroundColor').
  // On the element this directive sits, access the `style` property (which any element has) and then the sub-property `backgroundColor`
  // and we set this equal to whatever `backgroundColor` is set to.
  // @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

  // -->089 Binding to Directive Properties<--
  // The user should be able to dynamically set the value.
  // We use custom Property-Binding.
  @Input() defaultColor = 'transparent';
  @Input() highlightColor = 'yellow';
  @HostBinding('style.backgroundColor') backgroundColor: string;
  // We can provide an alias for the `highlightColor` and set this equal to our directive selector `appBetterHighlight`:
  // @Input('appBetterHighlight') highlightColor = 'yellow';

  // We're using the Renderer which is a better approach of accessing the DOM.
  // Now angular is not limited to running in the browser here, it for example also works with servers workers
  // (and these are environments where we might not have access to the DOM).
  constructor(private elRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    // ->085 Using the Renderer to build a Better Attribute Directive<
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');

    // -->089 Binding to Directive Properties<--
    this.backgroundColor = this.defaultColor;
  }

  // -->087 Using HostListener to Listen to Host Events<--
  // We need to react to some events occurring on the element the directive sits on,
  // with the `HostListener` decorator added to some method we want to execute.
  // This methods can be triggered whenever some event occurs and that event is specify as an argument as a string on the decorator.
  // `mouseenter` the argument name as an input. That is one of the events supported by the DOM element this directive sits on.
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // -->087 Using HostListener to Listen to Host Events<--
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');

    // -->088 Using HostBinding to Bind to Host Properties<--
    // this.backgroundColor = 'yellow';

    // -->089 Binding to Directive Properties<--
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // -->087 Using HostListener to Listen to Host Events<--
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');

    // -->088 Using HostBinding to Bind to Host Properties<--
    // this.backgroundColor = 'transparent';

    // -->089 Binding to Directive Properties<--
    this.backgroundColor = this.defaultColor;
  }

  // -->087 Using HostListener to Listen to Host Events<--
  // my example with the `click` event listener:
  @HostListener('click') mouseclick(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');
  }

}
