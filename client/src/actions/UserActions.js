//https://github.com/prashantban/Auth/blob/master/src/actions/UserActions.js
import Dispatcher from '../dispatcher/Dispatcher';
import { browserHistory } from 'react-router';

//Login Action
export function loginUser(token,pathname) {
  Dispatcher.handleAction({
    type: 'LOGIN_USER',
    data: token,
  });

  if (pathname) {
    //browserHistory.push(pathname);
  } else {
    localStorage.setItem('token', token);
    //browserHistory.push('/');
  }
};

export function logoutUser() {
	localStorage.removeItem('token');
	Dispatcher.handleAction({
		type: 'LOGOUT_USER'
	});
	//browserHistory.push("/");
}