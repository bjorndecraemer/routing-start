import {reject} from "q";

export class AuthService{
  isLoggedIn = false;

  isAuthenticated(){
    const promise = new Promise((resolve, reject) => {
      setTimeout(()=>{resolve(this.isLoggedIn)},800);
    })
    return promise;
  }

  login(){
    this.isLoggedIn = true;
  }

  logOut(){
    this.isLoggedIn = false;
  }
}
