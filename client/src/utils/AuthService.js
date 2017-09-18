// from: http://prashantb.me/authenticating-express-react-app-part-1/
// https://github.com/prashantban/Auth/blob/master/src/services/auth_service.js

import request from 'request';
import { loginUser, logoutUser } from '../actions/UserActions';

class AuthService {

  login(email,password) {
    const options = {
      url: 'http://localhost:3000/user/login',
      method: 'POST',
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    };
    return new Promise((resolve,reject) => {
      request(options, (err,res,body) => {
        if (res.statusCode >= 200 && res.statusCode <= 304) {
          body = JSON.parse(body);
          if (body.access_granted) {
            resolve(loginUser(body.token));
          } else {
            reject("Email/Pass is Invalid");
          }
        } else {
          reject("Email/Pass is Invalid");
        }
      });
    });
  }

  logout() {
    const options = {
      url: 'http://localhost:3000/user/logout',
      method: 'POST',
    };
    return new Promise((resolve, reject) => {
      request(options,(err,res,body) => {
        if (res.statusCode >= 200 && res.statusCode <= 304) {
          resolve(logoutUser());
        }
      });
    });
  }
}

export default new AuthService();
