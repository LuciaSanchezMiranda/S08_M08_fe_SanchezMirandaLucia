import { Component } from '@angular/core';
import { Hero } from '../../../shared/components/hero/hero';
import { Courses } from '../../../shared/components/courses/courses';
import { Benefits } from '../../../shared/components/benefits/benefits';
import { Contact } from '../../../shared/components/contact/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [Hero, Courses, Benefits, Contact]
})
export class HomePage { }
