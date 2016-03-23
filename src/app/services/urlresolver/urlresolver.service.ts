
import {UrlResolver} from 'angular2/compiler';

//https://github.com/kittencup/angular2-ama-cn/issues/18
//http://www.cnblogs.com/GarsonZhang/p/5179601.html
export class MyUrlResolver extends UrlResolver {
	
	resolve( baseUrl: string, url: string ): string {
		// if ( url.substr(-4) === '.css' ) {
		// 	return super.resolve('http://cdn.style.kittencup.com', url);
		
		// } else if ( url.substr(-5) == '.html') {
		// 	return super.resolve('http://cdn.template.kittencup.com', url);
		// }
		
		return super.resolve("src/app/components/", url);
	}
}

/*
@Component({
    selector: "hz-stepbody",
    templateUrl: "mytemplate:dm_template.html"
})
class Stepbody { }
import {provide, PACKAGE_ROOT_URL} from 'angular2/core';
import {UrlResolver} from 'angular2/compiler';
class MyUrlResolver extends UrlResolver {
    resolve(baseUrl: string, url: string): string {
        
        var resolvedUrl = url;
        
        if (url.substr(0, 6) == "mytemplate") {
            resolvedUrl = resolvedUrl.replace("mytemplate:", "/template/gz/");
        }else {
            resolvedUrl = super.resolve(baseUrl, url);
        }
        return resolvedUrl;
    }
}

 */