import { Component, EventEmitter , Input, Output} from 'angular2/core';

@Component({
	selector: 'person',
	template: `
	<div>
		<span>{{name}}</span>
		<button (click)="sayHello()">Say Hello</button>
	</div>`
})
export class PeopleComponent {
	
	@Output()
	public hello = new EventEmitter();
	
	@Input()
	public name : string;
	
	sayHello() {
		this.hello.next( this.name);
	}
}