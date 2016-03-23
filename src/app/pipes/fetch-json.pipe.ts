
import {Pipe, PipeTransform} from 'angular2/core';
import {JSONPService} from '../services/jsonp/jsonp.service'



let global  = new JSONPService() ;

@Pipe({
  name: 'fetch',
  pure: false  // stateful, default: stateless
})
export class FetchJSONPipe  implements PipeTransform{
  private _fetchedValue: any;
  private _fetchPromise: Promise<any>;
  
  transform(value: string, args: string[]):any {
    console.log("pipe: ", value );
    
    if (!this._fetchPromise) {
      this._fetchPromise = global
        .jsonp(value)
        .then( (json:any)   => {
            this._fetchedValue = JSON.stringify(json);
         });
    }
    return this._fetchedValue;
  }
}
