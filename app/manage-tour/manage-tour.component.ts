import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Tour } from '../../tour.model';

@Component({
  selector: 'app-manage-tour',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-tour.component.html',
  styleUrls: ['./manage-tour.component.css']
})
export class ManageTourComponent {
  tourForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.tourForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tourForm.valid) {
      const newTour: Tour = {
        id: 0, // Will be assigned by ApiService
        ...this.tourForm.value
      };
      this.apiService.addTour(newTour)
        .subscribe(
          () => {
            alert('Tour added successfully');
            this.tourForm.reset();
          },
          (error: any) => {
            console.error('Failed to add tour:', error);
            alert('Failed to add tour');
          }
        );
    }
  }
}
