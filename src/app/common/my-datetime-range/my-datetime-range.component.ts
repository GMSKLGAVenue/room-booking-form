import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'my-datetime-range',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyDatetimeRangeComponent),
      multi: true
    }
  ],
  template: `
    <label class="range-label" [attr.for]="id">{{ label }}</label>
    <p-calendar
      class="range-control"
      [id]="id"
      [placeholder]="placeholder"
      [selectionMode]="selectionMode"
      [showTime]="true"
      hourFormat="24"
      [showIcon]="true"
      [readonlyInput]="true"
      [disabled]="disabled"
      [ngModel]="value"
      (ngModelChange)="handleChange($event)"
    ></p-calendar>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .range-label {
        display: block;
        margin-bottom: 0.35rem;
        font-weight: 600;
      }

      .range-control {
        width: 100%;
      }
    `
  ]
})
export class MyDatetimeRangeComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() id = '';
  @Input() selectionMode: 'range' = 'range';
  @Output() onchange = new EventEmitter<Date[] | null>();

  value: Date[] | null = null;
  disabled = false;

  private onChange: (value: Date[] | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: unknown): void {
    this.value = Array.isArray(value) ? (value as Date[]) : null;
  }

  registerOnChange(onChange: (value: Date[] | null) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(value: Date[] | null): void {
    this.value = value;
    this.onchange.emit(value);
    this.onChange(value);
    this.onTouched();
  }
}