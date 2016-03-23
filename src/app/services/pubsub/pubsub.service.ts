//http://www.syntaxsuccess.com/viewarticle/pub-sub-in-angular-2.0

import {Subject} from 'rxjs/Subject';

export interface QueryParams {
	start: number;
	count: number;
}

export class QueryParamEventEmitter extends Subject<QueryParams> {
	constructor() {
		super();
	}
	
	emit (qp: QueryParams) {
		super.next(qp);
	}
}


export class PubSubService {
	stream: QueryParamEventEmitter;
	
	constructor() {
		this.stream = new QueryParamEventEmitter();
	}
}