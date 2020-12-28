import { Component, OnInit, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type passwordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string;
  @Output() changed = new EventEmitter<string>(); //the datatype will be same as that of value property

  value: string;
  isDisabled: boolean;
  passwordType:passwordType;
  private propagateChange: any=()=>{};
  private propageteTouched: any=()=>{};

  constructor() {
    this.passwordType='password';
   }

  ngOnInit(): void {
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propageteTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(value: string): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propageteTouched();
  }

  togglePassword(): void{
    this.passwordType=this.passwordType==='password'? 'text':'password';
  }

}
