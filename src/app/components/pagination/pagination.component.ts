
import {
	OnInit,
    Input,
	Component
} from 'angular2/core';

import { PubSubService, QueryParams } from "../../services/pubsub/pubsub.service";


export class PagingParam{
	constructor(
		public itemCount:   number,
        public itemPerPage: number,
		public offset: number,
        public limit:  number ) {
            
            //do /0 execption
            if (itemPerPage == 0) {
                itemPerPage = 1;
            }
            
        }
		
}

@Component({
	selector: "pagination",
    // providers: [PubSubService],
	templateUrl: "pagination/pagination.component.html",
	styleUrls: ["pagination/pagination.component.css"]
})
export class PaginationComponent  implements OnInit {
	
	@Input('params') 
	params: PagingParam;
     
    
    curPage:    number;
    totalPages: number;
      
    pages: Array<number>;
    
    constructor(private _pubsub : PubSubService) {}
    	
	ngOnInit(){
        this.totalPages = Math.floor(this.params.itemCount / this.params.itemPerPage);
        if (this.params.itemCount % this.params.itemPerPage != 0) {
             this.totalPages += 1;
        }
        
        this.fillPages();
        
        this.curPage =  this.params.offset+1;  
     }
    
    fillPages( ) {
       if ( this.params.offset < 0 ) {
             this.params.offset = 0;
        }
      
      let limit =   this.params.limit;          
      if (this.params.offset + limit > this.totalPages) {
          limit = this.totalPages -  this.params.offset;            
      }
      this.pages = Array<number>(limit).fill().map((x,i)=>{ return  this.params.offset + 1 + i;});
 
    }
    
	adjustedCurPage(curPage: number): number {
        if( isNaN(curPage)) {
            curPage = 1;
        }
		if (curPage < 1 ) {
            return 1;
        }
        if (curPage > this.totalPages) {
            return this.totalPages;
        }
		return curPage;
	}
    
	
    doPageTurning( curPage: number){
  
 		curPage = this.adjustedCurPage(curPage);
		
		if ( this.params.offset + this.params.limit < curPage) {
		     this.pages.shift();
		     this.pages.push(curPage);
			 this.params.offset++;
		
         } else if (curPage <= this.params.offset) {
              this.pages.pop();
              this.pages.unshift(curPage);
              this.params.offset--;
         }
        
		this.curPage = curPage;
        
        this.emit();
        
    }
    
    doGoTo(page: number){
        
        if( isNaN(page)) {
            page = 1;
        }
        page = this.adjustedCurPage(page);
        console.log(page);
        
        this.params.offset = page - this.params.limit;
        
        this.fillPages();
        this.curPage = +page;
        
        this.emit();
        
    }
    
    emit() {
        let qp = {
            start: (this.curPage-1) * this.params.itemPerPage,
            count: this.params.itemPerPage
        }
        this._pubsub.stream.emit(qp);
    }
    
    
    
}
