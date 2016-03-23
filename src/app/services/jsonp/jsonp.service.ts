
import {Injectable} from 'angular2/core';

interface JSONPCallback {
    (json: any): void;   
}
@Injectable()
export class JSONPService {
    jsonp(url: string): Promise<any> {
        
        let p = new Promise((resolve, reject)=>{
            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = url + (url.indexOf('?') > 0 ? '&' : '?') + 'callback=JSONP_CALLBACK&' + Date.now();
            script.onload=function(){
                script.parentNode.removeChild(script);
            };
           
            window['JSONP_CALLBACK'] = function (json) {
                resolve(json);
            };
            document.head.appendChild(script);
            
        });
        
        return  p;
    };
    
}
