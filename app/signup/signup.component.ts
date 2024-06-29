import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@gmail\.com$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    });
  }

  signup(): void {
    if (this.signupForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const { username, email, password } = this.signupForm.value;

    const passwordControl = this.signupForm.get('password');
    const confirmPasswordControl = this.signupForm.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      alert('Form controls not found.');
      return;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      alert('Passwords do not match');
      return;
    }

    // Prepare user data to send to backend
    const newUser = {
      username,
      email,
      password
    };

    // Send data to backend API
    this.http.post<any>('http://your-backend-api-url/register', newUser)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          alert('Registration successful!');
          this.signupForm.reset(); // Reset form after successful registration
        },
        (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      );
  }
}