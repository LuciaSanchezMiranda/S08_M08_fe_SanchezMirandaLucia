import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './contact.css'
})
export class Contact {
  contactForm: FormGroup;
  submitted = false;
  success = false;

  services = [
    'Consulta veterinaria',
    'Adopción',
    'Grooming & Spa',
    'Guardería / Hotel',
    'Tienda',
    'Adiestramiento',
    'Emergencia'
  ];

  contactInfo = [
    { icon: 'bi-geo-alt-fill', label: 'Dirección', value: 'Av. Los Pinos 345, Miraflores, Lima' },
    { icon: 'bi-telephone-fill', label: 'Teléfono', value: '+51 1 234 5678' },
    { icon: 'bi-envelope-fill', label: 'Email', value: 'hola@petnest.pe' },
    { icon: 'bi-clock-fill', label: 'Horario', value: 'Lun - Dom: 7am - 10pm' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s]{7,15}$/)]],
      petName: ['', Validators.required],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.success = true;
      this.contactForm.reset();
      this.submitted = false;
      setTimeout(() => this.success = false, 5000);
    }
  }
}
