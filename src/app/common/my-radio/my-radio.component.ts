import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'my-radio',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyRadioComponent),
      multi: true
    }
  ],
  template: `
    <div class="radio-row">
      <p-radioButton
        [name]="name"
        [value]="value"
        [ngModel]="modelValue"
        [disabled]="disabled"
        (ngModelChange)="handleChange($event)"
      ></p-radioButton>
      <span class="radio-label">{{ label }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .radio-row {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      .radio-label {
        line-height: 1.2;
      }
    `
  ]
})
export class MyRadioComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() value = '';
  @Input() name = '';
  @Output() onchange = new EventEmitter<string>();

  modelValue: string | null = null;
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: unknown): void {
    this.modelValue = typeof value === 'string' ? value : null;
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(selectedValue: string): void {
    this.modelValue = selectedValue;
    this.onchange.emit(selectedValue);
    this.onChange(selectedValue);

    this.onTouched();
  }
}