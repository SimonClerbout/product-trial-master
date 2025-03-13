import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formContact : FormGroup = new FormGroup({});
  isSubmitted: boolean = false;

  ngOnInit() {
    this.formContact = this.initFormContact();
  }

  initFormContact() {
    const form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, Validators.maxLength(300)])
    })
    return form;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.formContact.reset();
  }
}
