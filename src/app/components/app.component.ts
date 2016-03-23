
import {Component, OnInit} from 'angular2/core';
import {
     RouteConfig,
     ROUTER_DIRECTIVES, 
     ROUTER_PROVIDERS
    } from 'angular2/router';

//https://medium.com/@s_eschweiler/using-external-libraries-with-angular-2-87e06db8e5d1#.1t4xfod12
//https://dotblogs.com.tw/lapland/2016/03/09/102452
//https://github.com/Definitelytyped/tsd

/*
1. npm install tsd -g  //安装tsd工具
2. tsd init            //at root dir(only once)

3. npm install lodash      
4. tsd install lodash -s   //安装 dash.d.ts

5. <script src=”node_modules/lodash/lodash.js”></script>  //at index.html
6.
   System.config({
      [...]
      paths: {

          lodash: ‘./node_modules/lodash/lodash.js’
      }
   });
7. import * as _ from 'lodash';
8. use it
 */  
    
// import {LoginComponent} from './login/login.component';
// import {DashboardComponent} from './dashboard/dashboard.component';
// import {CloudMusicService} from '../services/netease/cloudmusic.service'
// import {MyCrypto} from '../services/netease/crypto/crypto'

// @Component ({
// 	selector: 'app',
// 	templateUrl:'app.component.html',
//     directives: [LoginComponent, DashboardComponent, ROUTER_DIRECTIVES],
//     providers: [ROUTER_PROVIDERS, CloudMusicService]
// })

// @RouteConfig([ 
//   { path: "/login", name: "Login", component: LoginComponent/*, useAsDefault: true*/ },
  
//   // dashboard child route
//   { path: "/dashboard/...", name: "Dashboard", component: DashboardComponent, useAsDefault: true }
// ])
// export class AppComponent  implements OnInit{
	
//   constructor( private x: CloudMusicService){}
// 	ngOnInit() {
//         MyCrypto.MD5("abcd");
//  	// 	//this.getHeroes();
// 	 }
// }



import {MyCrypto} from '../services/netease/crypto/crypto'

@Component ({
	selector: 'app',
	templateUrl:'src/app/components/app.component.html'
})

export class AppComponent  implements OnInit{
	
  constructor( ){}
	ngOnInit() {
        MyCrypto.MD5("abcd");
 	// 	//this.getHeroes();
	 }
}
