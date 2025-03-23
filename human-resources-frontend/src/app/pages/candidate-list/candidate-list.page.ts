import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonCard, IonCardContent, IonButtons, IonIcon, IonButton, IonCol, IonRow,
  IonGrid, IonInput, IonSelect, IonSelectOption, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../../models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

import { addOutline, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.page.html',
  styleUrls: ['./candidate-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    FormsModule,
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
    IonIcon,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCardTitle,
    IonCardHeader
  ]
})
export class CandidateListPage implements OnInit {
  candidates: Candidate[] = [];
  addOutlineIcon = addOutline;
  createOutlineIcon = createOutline;
  trashOutlineIcon = trashOutline;

  positionFilter: string = '';
  militaryStatusFilter: string = '';
  noticePeriodFilter: string = '';

  militaryStatusOptions = ['All', 'Completed', 'Exempted', 'Deferred'];
  noticePeriodOptions = ['All', 'No Notice', '2 Weeks', '1 Month', '2 Months'];

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.loadCandidates();
  }

  loadCandidates() {
    this.candidateService.getAllCandidates().subscribe(
      (data) => {
        this.candidates = data;
      }, 
      (error) => {
        console.log(error);

      })
  }

  ionViewWillEnter() {
    this.loadCandidates();
  }

  deleteCandidate(id: number | undefined) {
    if (id === undefined) {
      console.error('Cannot delete candidate with undefined id');
      return;
    }

    if(confirm('Are you sure you want to delete this candidate?')) {      
      this.candidateService.deleteCandidate(id).subscribe(
        () => {
          console.log("Candidate is deleted");
          this.loadCandidates();
        },
        (error) => {
          console.log("Error happened while deleting candidate: ", error);
        }
      )
    }
  }

  applyFilters() {
    this.candidateService.getAllCandidates().subscribe(
      (allCandidates) => {
        this.candidates = allCandidates.filter(candidate => {
          // Pozisyon filtresi
          if (this.positionFilter && !candidate.position.toLowerCase().includes(this.positionFilter.toLowerCase())) {
            return false;
          }
          
          // Askerlik durumu filtresi
          if (this.militaryStatusFilter && this.militaryStatusFilter !== 'All' && candidate.militaryStatus !== this.militaryStatusFilter) {
            return false;
          }
          
          // İhbar süresi filtresi
          if (this.noticePeriodFilter && this.noticePeriodFilter !== 'All' && candidate.noticePeriod !== this.noticePeriodFilter) {
            return false;
          }
          
          return true;
        });
      },
      (error) => {
        console.error('Error loading candidates', error);
      }
    );
  }
  clearFilters() {
    this.positionFilter = '';
    this.militaryStatusFilter = '';
    this.noticePeriodFilter = '';
    this.loadCandidates();
  }
}
