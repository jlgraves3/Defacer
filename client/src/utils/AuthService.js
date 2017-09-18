// from: http://prashantb.me/authenticating-express-react-app-part-1/
class AuthService {
  login(email,password) {
    const options = {
      url: 'http://localhost:3000/user/login',
      method: 'POST',
      body: JSON.stringify({
        "email": email,
        "password": password
      });
    };
    return new Promise((resolve,reject) => {
      request(options, (err,res,body) => {
        if (res.statusCode >= 200 && response.statusCode <= 304) {
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
}

export default new AuthService();

export function loginUser(token,pathname) {
  Dispatcher.handleAction({
    type: 'LOGIN_USER',
    data: token,
  });

  if (pathname) {
    browserHistory.push(pathname);
  } else {
    localStorage.setItem('token', token);
    browserHistory.push('/');
  }
}