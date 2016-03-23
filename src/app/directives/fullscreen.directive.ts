// // http://juristr.com/blog/2016/01/learning-ng2-dynamic-styles
// http://stackoverflow.com/questions/34641281/how-to-add-class-to-host-element

import {Directive, ElementRef, Renderer, Input, OnChanges} from 'angular2/core';
@Directive({
    selector: '[fullscreen]'
})
export class FullScreenDirective  implements OnChanges{
    
    @Input('fullscreen')
    isFullScreen: string;
        
    constructor( private _el: ElementRef, private _renderer: Renderer) {}

    
    ngOnChanges () {
       this._fullscreen();
    }
    
    private _fullscreen() {
        
        console.log("_fullscreen", this.isFullScreen);
        
        if (this.isFullScreen) {
            this._fullScreenOn();                
            
        } else {
            this._fullScreenOff();       
        }
    }
    
    
     /*
        Use window.innerWidth and window.innerHeight to retrieve the width and height of the browser window.
     */
    _fullScreenOn () { 
        this._renderer.setElementStyle(this._el, 'width', `${window.innerWidth}px`);
        this._renderer.setElementStyle(this._el, 'height', `${window.innerHeight}px`); 
   //   this._renderer.setElementStyle(this._el, 'position', `fixed`);
        
	} 
	 
	 
	_fullScreenOff() { 
   //     this._renderer.setElementClass(this._el, '', false);
  //      this._renderer.setElementStyle(this._el, 'position', 'static');
        
        this._renderer.setElementStyle(this._el, 'width', `480px`);
        this._renderer.setElementStyle(this._el, 'height', `320px`); 

	}
}
