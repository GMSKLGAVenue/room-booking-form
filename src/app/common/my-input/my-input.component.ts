import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'my-input',
  standalone: true,
  imports: [CommonModule, InputTextModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInputComponent),
      multi: true
    }
  ],
  template: `
    <label class="input-label" [attr.for]="id">{{ label }}</label>
    <input
      pInputText
      class="input-control"
      [id]="id"
      [type]="type"
      [placeholder]="placeholder"
      [value]="value"
      [disabled]="disabled"
      (input)="handleInput($event)"
      (blur)="markTouched()"
    />
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .input-label {
        display: block;
        margin-bottom: 0.35rem;
        font-weight: 600;
      }

      .input-control {
        width: 100%;
      }
    `
  ]
})
export class MyInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() id = '';
  @Output() onchange = new EventEmitter<string>();

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched = () => {};

  writeValue(value: unknown): void {
    this.value = typeof value === 'string' ? value : '';
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

  handleInput(event: Event): void {
    const nextValue = (event.target as HTMLInputElement).value;
    this.value = nextValue;
    this.onchange.emit(nextValue);
    this.onChange(nextValue);
  }

  markTouched(): void {
    this.onTouched();
  }
}