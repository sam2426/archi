import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regex, regexErrors, markFormGroupTouched } from '@app/shared/utils';
import { ControlItem } from '@app/models/frontend';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  form: FormGroup;
  isInline: boolean;
  regexErrors = regexErrors;

  items: ControlItem[];

  showSpinner: boolean = false;

  constructor(private fb: FormBuilder) {
    this.isInline=true;

    this.items=[
      {label:'first', value: 1},
      {label:'second', value: 2},
      {label:'third', value: 3},
      {label:'fourth', value: 4},
      {label:'fifth', value: 5},
    ];
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
      password: [null, {
        updateOn: 'blur', validators:[Validators.required]
      }],
      autoComplete: [null, {
        updateOn: 'change', validators: [Validators.required]
      }],
      select: [null, {
        updateOn: 'change', validators: [Validators.required]
      }],
      checkboxes: [null, {
        updateOn: 'change', validators: [Validators.required]
      }],
      radios: [null, {
        updateOn: 'change', validators: [Validators.required]
      }],
      date: [null, {
        updateOn: 'change', validators: [Validators.required]
      }],
      dateRange: [null, {
        updateOn: 'change', validators: [Validators.required]
      }]
    })
  }

  onPatchValue(): void {
    this.form.patchValue({
      input: 'test@gm.com',
      password: 'qwerty',
      autoComplete: 1,
      select: 2,
      checkboxes: [3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2020, 5, 10).getTime(),
        to: new Date(2020, 6, 12).getTime()
      }
    });
  }

  onSubmit(): void {
    console.log('Submitted');
    if(!this.form.valid){
      markFormGroupTouched(this.form);
    }
  }

  onToggleInline(): void {
    this.isInline = !this.isInline;
  }

  onToggleDisable(): void {
    if(this.form.enabled){
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onToggleSpinner(): void{
    this.showSpinner = !this.showSpinner;
  }

  onSuccess():void {

  }

  onError():void {

  }

}
