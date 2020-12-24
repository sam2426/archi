import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regex, regexErrors } from '@app/shared/utils';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  form: FormGroup;
  isInline: boolean;
  regexErrors = regexErrors;

  constructor(private fb: FormBuilder) {
    this.isInline=true;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: [null, {
        updateOn: 'blur', //this setting makes the field like errors to update after the cursor is outside control.
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.email)
        ]
      }],
    })
  }

  onPatchValue(): void {
    this.form.patchValue({ input: 'test' });
  }

  onSubmit(): void {
    console.log('Submitted')
  }

  onToggleInline(): void {
    this.isInline = !this.isInline;
  }

}
