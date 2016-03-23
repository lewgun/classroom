import {
  Directive,
  Attribute,
  ElementRef,
  DynamicComponentLoader
} from 'angular2/core';
  
import {
  Router, 
  RouterOutlet, 
  ComponentInstruction
} from 'angular2/router';

//https://auth0.com/blog/2016/01/25/angular-2-series-part-4-component-router-in-depth/

@Directive({
  selector: 'myrouter-outlet'
})

export class MyRouterOutlet extends RouterOutlet {
  
  private parentRouter: Router;

  constructor(
    _elementRef: ElementRef, 
    _loader: DynamicComponentLoader,
    _parentRouter: Router, 
    @Attribute('name') nameAttr: string) {
      
    super(_elementRef, _loader, _parentRouter, nameAttr);
  }


  activate(instruction: ComponentInstruction) {
    console.log('Hello from the new router outlet!');
    return super.activate(instruction);
  }
}