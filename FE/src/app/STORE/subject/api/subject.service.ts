import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  // service for adding subject
  addSubject(subjectDetail) {
    return this.http.post("http://localhost:8080/addSubject", subjectDetail);
  }

  // service for fetching subject list
  fetchSubject() {
    return this.http.get("http://localhost:8080/fetchSubject");
  }

  // service for deleting subject
  deleteSubject(subjectDetail) {
    return this.http.post("http://localhost:8080/deleteSubject", subjectDetail);
  }

  // service for adding exam
  updateSubject(subjectDetail) {
    return this.http.post("http://localhost:8080/updateSubject", subjectDetail);
  }
}
