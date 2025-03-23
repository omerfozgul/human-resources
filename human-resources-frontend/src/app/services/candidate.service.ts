import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private api_url = 'http://localhost:8080/api/candidates';

  constructor(private http: HttpClient) { }

  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.api_url);
  }

  saveCandidate(candidate: Candidate, file?: File): Observable<Candidate> {
    return this.http.post<Candidate>(this.api_url, candidate).pipe(
      switchMap(savedCandidate => {
        if (file) {
          return this.uploadCV(savedCandidate.id!, file).pipe(
            map(() => savedCandidate)
          );
        }
        return of(savedCandidate);
      })
    );
  }

  getCandidate(id: Number): Observable<Candidate> {
    var url = this.api_url + "/" + id;
    return this.http.get<Candidate>(url); 
  }

  updateCandidate(candidate: Candidate, file?: File): Observable<Candidate> {
    var url = this.api_url + "/" + candidate.id;
    return this.http.put<Candidate>(url, candidate).pipe(
      switchMap(updatedCandidate => {
        if (file) {
          return this.uploadCV(updatedCandidate.id!, file).pipe(
            map(() => updatedCandidate)
          );
        }
        return of(updatedCandidate);
      })
    );
  }

  deleteCandidate(id: number): Observable<Candidate> {
    var url = this.api_url + "/" + id;
    return this.http.delete<Candidate>(url)
  }

  uploadCV(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    var url = this.api_url + "/" + id + "/cv";
    return this.http.post(url, formData, {
      responseType: 'text'
    });
  }
}
