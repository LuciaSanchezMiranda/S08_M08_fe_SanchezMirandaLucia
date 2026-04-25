import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Courses } from '../../components/courses/courses';
import { Benefits } from '../../components/benefits/benefits';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [Hero, Courses, Benefits, Contact]
})
export class HomePage { }
