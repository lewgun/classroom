
import {
	OnInit,
    Input,
    Output,
	Component,
    EventEmitter
} from 'angular2/core';

import {
    Image,
    Participator,
    Subject,
    Rating
} from '../../types/types'

//https://auth0.com/blog/2016/01/25/angular-2-series-part-4-component-router-in-depth/

//http://juristr.com/blog/2016/01/learning-ng2-dynamic-styles/

@Component({
	selector: "subject",
	templateUrl: "rank/rank.component.html",
    styleUrls: ["rank/rank.component.css"]
})
export class RankComponent  implements OnInit {
    
    @Input('info')
    info: Subject;
    
    @Input('index')
    index: number;
    
    @Output('play')
     playEvent: EventEmitter<string> = new EventEmitter();
   
    
	ngOnInit(){
        //console.log(this.index);
    }
    position(): string {
      let num = +this.info.rating.stars; 
      let top = "-"+ (10- num/5)*11 + "px";
      return "0px " + top ;
        
    }
    
    onClicked(url: string ) {
        console.log(url);
        
        // this.playEvent.emit(url);        
        this.playEvent.emit(url);    
    }
}

