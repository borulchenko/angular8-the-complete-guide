import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: false}) submitForm: NgForm;
  defaultSubscription = 'advanced';
  formData = {
    email: '',
    subscription: '',
    password: ''
  };

  isSubmitted = false;

  onSubmit() {
    this.isSubmitted = true;
    const formData = this.submitForm.value;

    this.formData.email = formData.email;
    this.formData.subscription = formData.subscriptions;
    this.formData.password = formData.password;

    this.submitForm.reset();
  }
}
