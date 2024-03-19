import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  states: any[] = [];
  stateName: any[] = [];
  cities: any[] = [];
  educationalDetails!: FormArray;
  constructor(private fb: FormBuilder, private apiService: ApiService) { }


  ngOnInit(): void {
    this.initForm();
    this.loadStates();
  }
  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      profile: [''],
      experienceDocuments: [''],
      educationInstitute: ['', Validators.required],
      qualification: ['', Validators.required],
      address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        state: ['', Validators.required],
        city: [''],
        country: ['India'] // Default value
      })
    });

  }

  get f() {
    return this.userForm.controls;
  }

  loadStates() {
    this.apiService.getStates().subscribe((data: any) => {
      this.states = data;
    })
    console.log(this.states);
  }

  onChangeState(event: any): void {
    const stateId = event.target.value;
    if (stateId) {
      this.loadCities(stateId);
    } else {
      this.cities = [];
    }
  }

  loadCities(stateId: string): void {
    this.apiService.getCities(stateId).subscribe((data: any) => {
      this.cities = data;
    });
    console.log(this.cities);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log(formData);

      // Pass the form data to a function for further processing
      this.processFormData(formData);
    } else {
      // Log the validation status of each form control
      Object.keys(this.userForm.controls).forEach(controlName => {
        const control = this.userForm.get(controlName);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(innerControlName => {
            const innerControl = control.get(innerControlName);
            console.log(`${controlName}.${innerControlName} valid: ${innerControl?.valid}`);
          });
        } else {
          console.log(`${controlName} valid: ${control?.valid}`);
        }
      });

      console.error('Form is invalid. Cannot submit.');
    }
  }

  processFormData(formData: any): void {
    console.log('Form data to be processed:', formData);

  }
}
