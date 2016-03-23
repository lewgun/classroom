import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';


 import {UrlResolver} from 'angular2/compiler';
 import {MyUrlResolver } from './app/services/urlresolver/urlresolver.service';

import {AppComponent } from './app/components/app.component';

bootstrap(AppComponent,
 [HTTP_PROVIDERS, 
  provide(UrlResolver, {useClass: MyUrlResolver})])
