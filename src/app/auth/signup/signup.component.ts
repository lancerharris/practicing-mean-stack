import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  private authStatusSub: Subscription;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.authStatusSub = this.AuthService.getAuthStatusListener().subscribe(
      (authStatus) => {
        this.isLoading = false;
      }
    );
  }

  onSignup(signupForm) {
    if (signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.AuthService.createUser(
      signupForm.value.email,
      signupForm.value.password
    );
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
