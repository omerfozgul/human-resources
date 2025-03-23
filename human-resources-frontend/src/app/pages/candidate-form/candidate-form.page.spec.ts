import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateFormPage } from './candidate-form.page';

describe('CandidateFormPage', () => {
  let component: CandidateFormPage;
  let fixture: ComponentFixture<CandidateFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
