import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean=false; 
  returnedObject:any; 
  
  constructor(
    private formBuilder: FormBuilder, 
    private auth:AuthService,
    private router:Router
    // private socialAuthService: SocialAuthService
  ) {
    
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email_address: ['', Validators.required],
      password: ['', Validators.required],
      role:['',Validators.required]
    });    
    
  }

  onSubmit(){
    this.returnedObject=this.auth.login(this.loginForm.get('role').value);

    console.log(this.loginForm.get('role').value);
    
    
      this.router.navigate([`/${this.loginForm.get('role').value}`]);
  }

    
       
    

//   this.socialAuthService.authState.subscribe((user) => {
//     this.socialUser = user;
//     this.isLoggedin = (user != null);
//     console.log(this.socialUser);
//   });
// }

//   loginWithGoogle(): void {
//     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
//   }

//   logOut(): void {
//     this.socialAuthService.signOut();
//   }
}
