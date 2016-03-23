
import {Component, OnInit } from 'angular2/core';
// import {
//     Router,
//     RouteConfig,
//     RouterLink
// } from 'angular2/router';

import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';


import { MyRouterOutlet } from '../../directives/router-outlet.directive';

import { DialogService } from '../../services/dialog/dialog.service';

import {AccountListComponent} from '../account/account-list.component';
import {AccountQueryComponent} from '../account/account-query.component';

import {RecordLoginComponent} from '../record/record-login.component';
import {RecordRegisterComponent} from '../record/record-register.component';
import {RecordSMSComponent} from '../record/record-sms.component';
import {VideoPlayerComponent} from '../player/video-player.component'

@Component({
	templateUrl: "dashboard/dashboard.component.html",
    styleUrls: ["dashboard/dashboard.component.css"],
    providers: [DialogService],
	directives: [ROUTER_DIRECTIVES, MyRouterOutlet]

})
 @RouteConfig([
 	{path:"/account/list", name: "AccountList", component: AccountListComponent,  data: { link: "http://api.douban.com/v2/movie/top250" }, useAsDefault: true },
 	{path:"/account/query", name: "AccountQuery", component: AccountQueryComponent },
 	{path:"/record/login", name: "RecordLogin", component: RecordLoginComponent },
 	{path:"/record/register", name: "RecordRegister", component: RecordRegisterComponent},
   	{path:"/record/sms", name: "RecordSMS", component: RecordSMSComponent},   
    {path:"/play", name: "Play", component: VideoPlayerComponent},   
     
 ])
export class DashboardComponent  implements OnInit {
    
    groups: Array<group> = []; 
    selected: item;
    
    constructor( private _dlg: DialogService, private _router: Router){}
    
    ngOnInit() {
     //   this.groups = new Array<group>();
        this.fill(this.groups);
      
      //this._router.navigate( ['AccountList']);
        // this._router.navigate( ['AccountList', { link: "http://api.douban.com/v2/movie/top250" }] );
       // this.dump();
    }
    
    fill( groups : Array<group> ){
        
        let tmp = new group();
                
        //帐号管理
        tmp.name = "帐号管理"
        tmp.type = GroupType.Account;
        
        let id = 0;
        
        tmp.items = new Array<item>();
        tmp.items.push(
            {link:"AccountList", name: "帐号列表", id: id++ },
            {link:"AccountQuery", name: "用户查询", id: id++}
        )
        groups.push(tmp);
        
        id = 0;
                
        //记录管理
        tmp = new group();
        tmp.name = "记录管理"
        tmp.type = GroupType.Record;
        tmp.items = new Array<item>();
        tmp.items.push(
            {link:"RecordRegister", name: "注册记录", id: id++},
            {link:"RecordLogin", name: "登录记录", id: id++},
            {link:"RecordSMS", name: "短信记录", id: id++}
        )
        groups.push(tmp);
        
        
    }
    
    dump() {
       for ( let group of this.groups) {
           console.log(group.name + "\n");
           for ( let item of group.items) {
               console.log(item.link, item.name);
               
           }
       }
    }
    
    onLogout($event ) {
        this._dlg.alert("logout now");
    }
    
    onSelect( cur: item ) {   
        
      //  this._dlg.alert(cur.name);
        this.selected = cur;
        
       // this._router.navigate
        
    }
    

}


enum GroupType{
     Account,
     Record,
     Count
}

class item {
    id:   number;
    link: string;
    name: string;
}
class group {
    type: GroupType;
    name: string;
    items: Array<item>;
}