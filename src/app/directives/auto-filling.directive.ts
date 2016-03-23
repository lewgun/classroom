
//https://coryrylan.com/blog/angular-2-text-snippet-directive
import {
    Directive,
    Input
} from 'angular2/core';

interface Snippet {
    id? :number;
    name: string;
    content: string;
}

@Directive({
    selector: '[snippets]',
    host: {
        '(input)': 'onChangeX($event)'
    }
})
export class AutoFillingDirective {
    @Input('snippets')
    snippets: Array<Snippet>;
    
    private _reSnippet: RegExp;
    
    constructor() {
        this._reSnippet = /(?:^|\W)(\w+)(?!\w)`/g;  //match on given string with a following '`'
    }
    onChangeX($event) {
        if ($event.target.value.match(this._reSnippet) !== null) {
            $event.target.value = this._value($event.target.value);
        }
    }
    
    private _value(value: string ) {
        let snippets = value.match(this._reSnippet);
        
        snippets.forEach(snippet=>{
           value = value.replace(snippet, this._snippetContent(snippet)); 
        });
        
        return value;
    }
    
    private _snippetContent( snippet) {
        this.snippets.forEach(s => {
            if ( s.name.toLowerCase() === snippet.trim().replace('`', '').toLowerCase()) {
                snippet = s.content;
            }
        });
        
        return snippet;
    }
}


/*
import {Component} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
import {AutoFillingDirective} from 'src/auto-filling.directive';

@Component({
  selector: 'demo-app',
  template: '<textarea [snippets]="mySnippets"></textarea>',
  directives: [AutoFillingDirective]
})
export class App {
  constructor() { 
    this.mySnippets = [
      {
        name: 'lorem',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
      },
      {
        name: 'bacon',
        content: 'Bacon ipsum dolor amet doner strip steak pastrami, hamburger sirloin spare ribs andouille. Salami drumstick strip steak ground round pork loin pastrami pancetta porchetta andouille pork chop short loin. Beef ground round t-bone shank leberkas flank filet mignon boudin meatball jowl short ribs.'
      },
      {
        name: 'zombie',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
      }
    ];
  }
}

bootstrap(App, [
  FORM_PROVIDERS
]);
 */