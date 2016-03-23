import * as _ from 'lodash';
import {Injectable} from 'angular2/core';

import { MyCrypto} from './crypto/crypto';

@Injectable()
export class CloudMusicService {
	
	constructor() {
		
		console.log("hello from cloudMusice");
		  _.map([1, 2, 3,4], function(n) {
     		console.log(n);
     	  });
		MyCrypto.MD5("hahahaha");
		//console.log(MyCrypto.aesRsaEncrypt("123"));
	}
	
}