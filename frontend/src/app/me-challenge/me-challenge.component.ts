import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { ChallengeService } from '../challenge.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-me-challenge',
  templateUrl: './me-challenge.component.html',
  styleUrls: ['./me-challenge.component.css']
})
export class MeChallengeComponent {
  isLoggedin = this.registration_service.isLoggedIn();
  private options: String[];
  public form: FormGroup;
  private valid: Boolean = false;
  
  constructor(private registration_service: RegistrationService, private challengeService: ChallengeService, private formBuilder: FormBuilder){
    this.options = [];
    this.form = this.formBuilder.group({
      noun: [false],
      verb: [false],
      adj: [false],
      emotion: [false],
      style: [false],
      colors: [false]
    });
  }

  onSubmit() {
    for (var option in this.form.value) {
      if (this.form.value[option]) {
        this.valid = true;
      }
      this.options.push(this.form.value[option])
    }
    if (this.valid) {
      this.challengeService.createChallenge(this.options)
    } else {
      window.alert("You must choose at least one option.")
    }
    
    console.log(this.options)
  }
}
