import { Component, OnInit } from '@angular/core';
import { Options } from './options';
import { JsonpService } from './app.service';

// Keep the Input import for now, you'll remove it later:
import { Router }   from '@angular/router';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [JsonpService],
})
export class FormComponent implements OnInit {

  constructor(
    private jsonpService: JsonpService,
    private router: Router,
  ){}

  disabled: boolean = false;

  options: Options = {
    verifyEmail: false,
    verifyProviderEmail: false,
    allowUnverifiedLogin: false,
    preventLoginIDHarvesting: false,
    sendWelcomeEmail: false,
    sendAccountDeletedEmail: false,
    defaultLanguage: 'en',
    loginIdentifierConflict: 'ignore',
    loginIdentifiers: 'email',
    errorCode: 0,
  };

  languages = [
    {value: 'en', label: 'English'},
    {value: 'fr', label: 'French'},
    {value: 'it', label: 'Italian'},
  ];
  loginIdentifiers = [
    {value: 'email', label: 'email'},
    {value: 'username', label: 'username'},
    {value: 'email, username', label: 'email, username'},
  ];
  loginIdentifierConflicts = [
    {value: 'ignore', label: 'Ignore'},
    {value: 'failOnSiteConflictingIdentity', label: 'Fail on site conflicting identity'},
    {value: 'failOnAnyConflictingIdentity', label: 'Fail on any conflicting identity'},
  ];

  onChange = (e): void => {
    e.target.checked = false;
    this.options.sendAccountDeletedEmail = false;
    alert("Cannot be set to true , without an  Account Deletion Confirmation  email template having been defined either in the accountDeletedEmailTemplates parameter or in the RaaS Email Templates.");
  };

  onSubmit = (options): void => {
    this.jsonpService.setData(options)
      .then((data) => {
        console.log(data);
        const res = data.json();
        if (res.errorCode === 0) {
          alert('Your data was successfully saved');
        } else {
          this.options.errorCode = res.errorCode;
          this.options.errorMessage = res.errorMessage;
        }
      });
  };

  ngOnInit(): void {
    this.jsonpService.getData()
      .then((options) => {
        this.options = options;
      });

    let currentUrl = this.router.url;
    this.disabled = currentUrl === '/readonly';

  }
}
