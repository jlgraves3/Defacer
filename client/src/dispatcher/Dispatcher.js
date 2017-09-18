//http://prashantb.me/authenticating-express-react-app-part-1/
//https://github.com/prashantban/Auth/blob/master/src/dispatcher/Dispatcher.js

import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {
	handleAction(action) {
		this.dispatch({
			action: action,
		});
	}
}

export default new DispatcherClass();