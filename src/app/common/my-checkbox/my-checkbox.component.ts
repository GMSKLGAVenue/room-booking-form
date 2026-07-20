import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'my-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyCheckboxComponent),
      multi: true
    }
  ],
  template: `
    <div class="checkbox-row">
      <p-checkbox
        [binary]="true"
        [ngModel]="checked"
        [disabled]="disabled"
        (ngModelChange)="handleChange($event)"
      ></p-checkbox>
      <span class="checkbox-label">{{ label }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .checkbox-row {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      .checkbox-label {
        line-height: 1.2;
      }
    `
  ]
})
export class MyCheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() value = '';
  @Output() onchange = new EventEmitter<string[]>();

  checked = false;
  disabled = false;
  private selectedValues: string[] = [];

  private onChange: (value: string[]) => void = () => {};
  private onTouched = () => {};

  writeValue(value: unknown): void {
    this.selectedValues = Array.isArray(value) ? value : [];
    this.checked = this.selectedValues.includes(this.value);
  }

  registerOnChange(onChange: (value: string[]) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChange(checked: boolean): void {
    this.checked = checked;
    this.selectedValues = checked
      ? Array.from(new Set([...this.selectedValues, this.value]))
      : this.selectedValues.filter((item) => item !== this.value);

    this.onchange.emit([...this.selectedValues]);
    this.onChange([...this.selectedValues]);
    this.onTouched();
  }
}