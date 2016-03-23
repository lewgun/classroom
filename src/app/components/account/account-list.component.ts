import {
	OnInit,
	Component,
    
} from 'angular2/core';

import 'rxjs/Rx';

import {RouteParams, RouteData, Router } from 'angular2/router';

import {RankComponent } from '../rank/rank.component';
import {PaginationComponent, PagingParam } from '../pagination/pagination.component';
import {JSONPService} from '../../services/jsonp/jsonp.service';
import {PubSubService, QueryParams} from '../../services/pubsub/pubsub.service';

import {Chart} from '../../types/types'

@Component({
	selector: "account-list",
	templateUrl: "account/account-list.component.html",
	styleUrls: ["account/account-list.component.css"],
	providers : [JSONPService, PubSubService],
    directives: [RankComponent, PaginationComponent ]
})
export class AccountListComponent  implements OnInit {
    
	chart: Chart;
	pagingParams: PagingParam 
	
	queryParams: QueryParams = {
		start: 0,
		count: 20
	}
	
	
    private _url: string;
	
	constructor( private _routeData: RouteData, private _router: Router, private _jsonp: JSONPService, private _pubsub: PubSubService) {
		this.pagingParams = new PagingParam(250, 20, 0, 10);
	}
	
	ngOnInit(){
		
		this._url = this._routeData.get('link');
		
	    if (!this._url) {
		 	this._url = "http://api.douban.com/v2/movie/top250";
		 }
		
		this.pageTurning(this.queryParams);
		
		this._pubsub.stream.subscribe(qp => this.pageTurning(qp));
		
     
	}
	
	 pageTurning(qp: QueryParams) {
		 this.queryParams = qp;
		 let url = `${this._url}?start=${qp.start}&count=${qp.count}`;
		 //console.log(url);
		
		//this.movies = "loading data from douban, please waiting....";
		this._jsonp.jsonp(url).then( data => {
            this.chart = data;
        } );
		
	 }
     
     onPlay(url:string) {
        this._router.navigate( ['Play'/*, { link: url }*/] );          
     }


}


