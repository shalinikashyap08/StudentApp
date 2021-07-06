import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLogin:boolean=false;
  roleAs:string;
  constructor() { 
  }
  login(data) {
    this.isLogin = true;
    this.roleAs = data;
    localStorage.setItem('STATE', 'true');
    console.log(this.roleAs);
    localStorage.setItem('ROLE', this.roleAs);
    return ({ success: this.isLogin, role: this.roleAs });
  }
  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    return ({ success: this.isLogin, role: '' });
  }
  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true' )
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }
  getRole() {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }
}
