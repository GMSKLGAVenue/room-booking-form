import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyCheckboxComponent } from './common/my-checkbox/my-checkbox.component';
import { MyDatetimeRangeComponent } from './common/my-datetime-range/my-datetime-range.component';
import { MyInputComponent } from './common/my-input/my-input.component';
import { MyRadioComponent } from './common/my-radio/my-radio.component';
import { TranslationService } from './common/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, MyCheckboxComponent, MyDatetimeRangeComponent, MyInputComponent, MyRadioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bookingForm: FormGroup;
  readonly title = this.t('app.title');
  readonly equipmentOptions = [
    { value: 'mixer', label: this.t('app.form.equipment.mixer') },
    { value: 'projector', label: this.t('app.form.equipment.projector') }
  ];
  readonly keySourceOptions = [
    { value: 'mailbox', label: this.t('app.form.keySource.mailbox') },
    { value: 'ownKey', label: this.t('app.form.keySource.ownKey') }
  ];

  constructor(private fb: FormBuilder, private translationService: TranslationService) {
    this.bookingForm = this.fb.group({
      name: [''],
      whatsapp: [''],
      email: [''],
      eventName: [''],
      dateRange: [null],
      equipment: [[]],
      keySource: ['']
    });
  }

  t(key: string): string {
    return this.translationService.t(key);
  }
}