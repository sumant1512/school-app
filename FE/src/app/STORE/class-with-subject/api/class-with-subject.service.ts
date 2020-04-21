import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClassWithSubjectService {
  constructor(private http: HttpClient) {}

  // service for getting class with subject
  fetchClassWithSubject() {
    return this.http.get("http://localhost:8080/fetchClassWithSubject");
  }

  // service for removing subject to class
  removeSubject(subjectDetails) {
    return this.http.post(
      "http://localhost:8080/removeSubject",
      subjectDetails
    );
  }
}
