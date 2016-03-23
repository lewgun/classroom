
import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
@Component({
  template: `
   <h2> dashboard home </h2>
  	<a (click)="gotoDetail()">GotoDetail</a>
  `
//  providers:[Router]   //don't need it 
})
export class DashboardHomeComponent implements OnInit {
   constructor(
     private _router: Router) {}
	
  ngOnInit() {
  }
  gotoDetail() {
    this._router.navigate(['DashboardDetail', { id:0 }]  );
  }
}