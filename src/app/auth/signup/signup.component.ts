import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public isLoading: boolean = false

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
  }

  onSignup(signupForm) {
    if (signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.AuthService.createUser(signupForm.value.email, signupForm.value.password)
  }

}
