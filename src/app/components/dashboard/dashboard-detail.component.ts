import {Component, OnInit} from 'angular2/core';

import {CanDeactivate, ComponentInstruction, Router} from 'angular2/router';
import {DialogService} from '../../services/dialog/dialog.service';


@Component({
	template:`
	<div>
		<button (click)="save()">Save </button>
		<button (click)="cancel()">Cancel </button>		
	</div>
	`,
	providers: [DialogService,
	 /*Router*/   //don't need it, if get it , will get: Cannot resolve all parameters for Router
	 ]
})
export class DashboardDetailComponent implements OnInit, CanDeactivate {
	  constructor(
		private _router: Router,
		private _dialog: DialogService
    ) { }
	
	ngOnInit(){}
	routerCanDeactivate( next : ComponentInstruction, prve: ComponentInstruction): any {
		
		//allow synchronous navigation ('true' ) if no changed.
		// if() {
		// 	return true;
		// }
		
		//otherwise ask the user with the dialog service and return its
		//promise which resolve to true or false when the user decides
		return this._dialog.confirm('Discared change?');
	}
	cancel() {
		this.gotoLogin();
	}
	save() {
		this.gotoLogin();
	}
	
	gotoLogin() {
		this._router.navigate(['Dashboard']);
	}
}