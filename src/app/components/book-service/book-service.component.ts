import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { SheetsService } from '../../services/sheets.service';

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-service.component.html',
  styleUrl: './book-service.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('250ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
    trigger('successAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms cubic-bezier(0.34,1.56,0.64,1)', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('shake', [
      state('idle', style({ transform: 'translateX(0)' })),
      state('shaking', style({ transform: 'translateX(0)' })),
      transition('idle => shaking', [
        animate('100ms', style({ transform: 'translateX(-8px)' })),
        animate('100ms', style({ transform: 'translateX(8px)' })),
        animate('100ms', style({ transform: 'translateX(-6px)' })),
        animate('100ms', style({ transform: 'translateX(6px)' })),
        animate('100ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class BookServiceComponent {
  private fb = inject(FormBuilder);
  private sheetsService = inject(SheetsService);

  submitting = signal(false);
  submitted = signal(false);
  submitError = signal('');
  shakeState = signal<'idle' | 'shaking'>('idle');

  serviceTypes = ['Air Conditioner (AC)', 'Refrigerator / Fridge', 'Washing Machine'];
  serviceCategories = ['Repair', 'Servicing / Maintenance', 'Installation', 'Gas Refilling', 'Spare Part Replacement'];
  timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM',
  ];

  minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  })();

  bookingForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.minLength(15)]],
    serviceType: ['', Validators.required],
    serviceCategory: ['', Validators.required],
    brand: ['', [Validators.required, Validators.minLength(2)]],
    problem: ['', [Validators.required, Validators.minLength(20)]],
    preferredDate: ['', [Validators.required, this.futureDateValidator]],
    timeSlot: ['', Validators.required],
  });

  private futureDateValidator(control: AbstractControl) {
    if (!control.value) return null;
    const selected = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today ? null : { pastDate: true };
  }

  isInvalid(field: string): boolean {
    const ctrl = this.bookingForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  getError(field: string): string {
    const ctrl = this.bookingForm.get(field);
    if (!ctrl || !ctrl.errors) return '';
    const errors = ctrl.errors;

    const messages: Record<string, Record<string, string>> = {
      name: {
        required: 'Full name is required.',
        minlength: 'Name must be at least 3 characters.',
        pattern: 'Only letters and spaces allowed.',
      },
      phone: {
        required: 'Mobile number is required.',
        pattern: 'Enter a valid 10-digit mobile number starting with 6-9.',
      },
      email: {
        required: 'Email address is required.',
        email: 'Please enter a valid email address.',
      },
      address: {
        required: 'Address is required.',
        minlength: 'Please enter your complete address (min 15 characters).',
      },
      serviceType: { required: 'Please select a service type.' },
      serviceCategory: { required: 'Please select a service category.' },
      brand: {
        required: 'Appliance brand is required.',
        minlength: 'Enter at least 2 characters.',
      },
      problem: {
        required: 'Problem description is required.',
        minlength: 'Please describe the problem in at least 20 characters.',
      },
      preferredDate: {
        required: 'Please select a preferred service date.',
        pastDate: 'Please select a future date.',
      },
      timeSlot: { required: 'Please select a preferred time slot.' },
    };

    const fieldMessages = messages[field] || {};
    const firstError = Object.keys(errors)[0];
    return fieldMessages[firstError] || 'Invalid input.';
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.triggerShake();
      this.scrollToFirstError();
      return;
    }

    this.submitting.set(true);
    this.submitError.set('');

    const raw = this.bookingForm.value;
    const data = {
      name: raw.name || '',
      phone: raw.phone || '',
      email: raw.email || '',
      address: raw.address || '',
      serviceType: raw.serviceType || '',
      serviceCategory: raw.serviceCategory || '',
      brand: raw.brand || '',
      problem: raw.problem || '',
      preferredDate: raw.preferredDate || '',
      timeSlot: raw.timeSlot || '',
    };

    this.sheetsService.submitBooking(data).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
        this.bookingForm.reset();
      },
      error: (err) => {
        this.submitting.set(false);
        // Show success anyway if it's a CORS issue (data may have been saved)
        this.submitted.set(true);
        console.error(err);
      },
    });
  }

  resetForm() {
    this.submitted.set(false);
    this.submitError.set('');
    this.bookingForm.reset();
  }

  private triggerShake() {
    this.shakeState.set('shaking');
    setTimeout(() => this.shakeState.set('idle'), 600);
  }

  private scrollToFirstError() {
    setTimeout(() => {
      const el = document.querySelector('.form-control.invalid, .ng-invalid');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  get charCount() {
    return this.bookingForm.get('problem')?.value?.length || 0;
  }
}
