import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonCard, IonCardContent, IonButtons, IonButton, 
  IonIcon, IonInput, IonSelect, IonSelectOption, IonBackButton } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { Candidate } from '../../models/candidate';



@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.page.html',
  styleUrls: ['./candidate-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    ReactiveFormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonCard, 
    IonCardContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonBackButton
  ]
})
export class CandidateFormPage implements OnInit {
  candidateForm: FormGroup;
  isEditMode = false;
  candidateId: number | null = null;
  selectedFile: File | null = null;
  selectedFileName: string = '';

  militaryStatusOptions = [
    'Completed',
    'Exempted',
    'Deferred'
  ];

  noticePeriodOptions = [
    'No Notice',
    '2 Weeks',
    '1 Month',
    '2 Months'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.candidateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      militaryStatus: ['', Validators.required],
      noticePeriod: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cv: ['']
    })
   }

  ngOnInit() {
    //Check if it is edit mode or not
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.isEditMode = true;
      this.candidateId = parseInt(id, 10);
      this.loadCandidate(this.candidateId);
      console.log("Edit mode")
    }
    else {
      console.log("Save Mode")
    }
  }

  loadCandidate(id: number) {
    this.candidateService.getCandidate(id).subscribe(
      (data) => {
        this.candidateForm.patchValue(data);

        // CV adını selectedFileName değişkenine ata
        if (data.cv) {
          this.selectedFileName = data.cv;
        }
      },
      (error) => {
        console.log("error: ", error);
      }
    )
  }

  onSubmit() {
    if (this.candidateForm.invalid) {
      console.log("candidate form is invalid")
      return;
    }
  
    const candidate: Candidate = this.candidateForm.value;
  
    if(this.isEditMode && this.candidateId) {
      //Edit Mode
      candidate.id = this.candidateId;
      this.candidateService.updateCandidate(candidate, this.selectedFile || undefined).subscribe(
        () => {
          console.log("Candidate is updated succesfully");
          this.router.navigate(['/candidate-list']);
        },
        (error) => {
          console.log('Error happened in editing candidate: ', error);
        }
      )
    }
    else {
      //Save Mode
      this.candidateService.saveCandidate(candidate, this.selectedFile || undefined).subscribe(
        () => {
          console.log("Candidate is added succesfully");
          this.router.navigate(['/candidate-list']);
        },
        (error) => {
          console.error('Error adding candidate', error);
        }
      )
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.candidateForm.patchValue({
        cv: file.name
      });
    }
  }
}
